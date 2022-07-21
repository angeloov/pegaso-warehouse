import * as trpc from "@trpc/server";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import * as utils from "./jwt/utils";
import type { Context } from "./index";

import jwt from "jsonwebtoken";

import itemModel from "./mongoose/Item";
import userModel from "./mongoose/User";
import computeNextId from "./utils/computeNextId";
import { computeNextPegId } from "./utils/computeNextId";

import { generate } from "@pdfme/generator";
import pdfTemplate from "./pdf/config";
import * as fs from "fs";
import path from "path";

import crypto from "crypto";

import type { UserType } from "./mongoose/User";

const appRouter = trpc
  .router<Context>()
  .query("hello", {
    resolve() {
      return { text: "ciao" };
    },
  })
  .query("getMyInfo", {
    async resolve({ ctx }) {
      if (ctx.jwt) return await utils.getUserInfo(ctx.jwt);

      return new TRPCError({
        code: "UNAUTHORIZED",
      });
    },
  })
  .mutation("createItem", {
    input: z.object({
      name: z.string(),
      quantity: z.number().min(0).max(100),
      position: z.string(),
      projectName: z.string(),
      tags: z.string().array(),
      website: z.string().optional(),
      partNumber: z.string().optional(),
    }),
    async resolve({ input, ctx }) {
      const count = await itemModel.count();
      let lastID;
      if (count > 0) {
        lastID = (await itemModel.find().skip(count - 1))[0]["_id"];
      }

      const { id: userID } = jwt.verify(ctx.jwt, process.env.ACCESS_TOKEN_SECRET);

      await itemModel.create({
        _id: count > 0 ? computeNextId(lastID) : "AA000",
        name: input.name,
        quantity: input.quantity,
        position: input.position,
        tags: input.tags,
        project_name: input.projectName,
        wasAlreadyPrinted: false,
        history: [
          {
            user_id: userID,
            date: new Date(),
          },
        ],
        website: input.website,
        part_number: input.partNumber,
      });
    },
  })
  .query("search", {
    input: z.object({
      itemName: z.string(),
      projectName: z.string(),
      position: z.string(),
      tags: z.string().array(),
    }),
    async resolve({ input, ctx }) {
      const queryCriteria = {
        name: { $regex: ".*" + input.itemName + ".*", $options: "i" },
        project_name: { $regex: ".*" + input.projectName + ".*", $options: "i" },
        position: { $regex: ".*" + input.position + ".*", $options: "i" },
      };

      if (input.tags.length > 0) queryCriteria.tags = { $in: input.tags };

      return await itemModel.find(queryCriteria);
    },
  })
  .query("getItemInfoByID", {
    input: z.object({
      itemID: z.string(),
    }),
    async resolve({ input }) {
      // Resolve usernames in history
      const query = await itemModel.findById(input.itemID);
      // console.log(query);

      for (let obj of query.history) {
        const user = await userModel.findById(obj.user_id);
        if (!user)
          console.error(`There was an error, the user with user_id ${obj.user_id} doesn't exist`);

        obj.firstname = user.firstname;
      }

      return query;
    },
  })
  .mutation("editItem", {
    input: z.object({
      itemID: z.string(),
      edits: z.object({
        name: z.string().optional().nullable(),
        quantity: z.number().optional().nullable(),
        position: z.string().optional().nullable(),
        tags: z.string().array().optional().nullable(),
        projectName: z.string().optional().nullable(),
      }),
    }),
    async resolve({ ctx, input }) {
      const { id: userID } = jwt.verify(ctx.jwt, process.env.ACCESS_TOKEN_SECRET as jwt.Secret);
      const item = await itemModel.findById(input.itemID);

      console.log(input);

      // TODO: When adding something to history append it to the start of the array so the last changes are at the beginning
      if (Object.keys(input.edits).length > 0) {
        const itemEdits = {
          name: input.edits.name ?? undefined,
          quantity: input.edits.quantity ?? undefined,
          position: input.edits.position ?? undefined,
          project_name: input.edits.projectName ?? undefined,
          $push: {
            history: { $each: [{ user_id: userID, date: new Date(), edits: [] }], $position: 0 },
          },
        };

        let modifications = itemEdits["$push"]["history"]["$each"][0]["edits"];
        for (let [key, value]: [string, any] of Object.entries(itemEdits)) {
          if (value && key != "$push") {
            modifications.push({ key: key, from: item[key], to: value });
          }
        }

        await itemModel.updateOne({ _id: input.itemID }, itemEdits);
      }
    },
  })
  .mutation("removeItems", {
    input: z.object({
      itemID: z.string(),
      prevQuantity: z.number(),
      itemsToRemove: z.number(),
    }),
    async resolve({ input, ctx }) {
      const { id: userID } = jwt.verify(ctx.jwt, process.env.ACCESS_TOKEN_SECRET as jwt.Secret);

      const itemEdits = {
        quantity: input.prevQuantity - input.itemsToRemove,
        $push: {
          history: {
            $each: [
              {
                user_id: userID,
                date: new Date(),
                edits: [
                  {
                    key: "quantity",
                    from: input.prevQuantity,
                    to: input.prevQuantity - input.itemsToRemove,
                  },
                ],
              },
            ],
            $position: 0,
          },
        },
      };

      await itemModel.updateOne({ _id: input.itemID }, itemEdits);
    },
  })
  .query("generatePDF", {
    input: z.object({
      itemIDs: z.string().array(),
    }),
    async resolve({ input }) {
      // {
      //   ID1: "AA000",
      //   ID2: "AA001",
      //   ID3: "AA002",
      //   ID4: "AA003",
      //   ID5: "AA004",
      //   ID6: "AA005",
      //   QR1: "AA000",
      //   QR2: "AA001",
      //   QR3: "AA002",
      //   QR4: "AA003",
      //   QR5: "AA004",
      //   QR6: "AA005",
      // },

      await itemModel.updateMany(
        {
          _id: {
            $in: input.itemIDs,
          },
        },
        {
          $set: { wasAlreadyPrinted: true },
        }
      );

      const inputs = [{}];
      for (let i = 1; i <= input.itemIDs.length; i++) {
        inputs[0][`ID${i}`] = input.itemIDs[i - 1];
        inputs[0][`QR${i}`] = input.itemIDs[i - 1];
      }

      const hash = crypto.randomBytes(32).toString("hex");
      const template = pdfTemplate;

      const pdf = await generate({ template, inputs });
      fs.writeFileSync(path.resolve(__dirname, "..", "src", "pdf", "static", `${hash}.pdf`), pdf);

      // TODO: change url here
      return `http://localhost:4000/pdf/${hash}.pdf`;
    },
  })
  .query("getNextPegID", {
    async resolve() {
      const res = await itemModel.find({ name: { $regex: "PEG.*" } });
      const lastPegItem = res[res.length - 1];

      return `Il prossimo ID disponibile è ${computeNextPegId(lastPegItem["name"])}`;
    },
  })
  .query("getItemsToBePrinted", {
    input: z.object({
      wasAlreadyPrinted: z.boolean(),
    }),
    async resolve({ input }) {
      return await itemModel.find({ wasAlreadyPrinted: input.wasAlreadyPrinted });
    },
  });

export default appRouter;
