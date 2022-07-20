import * as trpc from "@trpc/server";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import * as utils from "./jwt/utils";
import type { Context } from "./index";

import jwt from "jsonwebtoken";

import itemModel from "./mongoose/Item";
import userModel from "./mongoose/User";
import computeNextId from "./utils/computeNextId";

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
      // tags: z.string().array(),
    }),
    async resolve({ input, ctx }) {
      const query = await itemModel.find({
        name: { $regex: ".*" + input.itemName + ".*" },
        project_name: { $regex: ".*" + input.projectName + ".*" },
        position: { $regex: ".*" + input.position + ".*" },
      });

      return query;
    },
  })
  .query("getItemInfoByID", {
    input: z.object({
      itemID: z.string(),
    }),
    async resolve({ input }) {
      // Resolve usernames in history
      const query = await itemModel.findById(input.itemID);

      for (let obj of query.history) {
        obj.firstname = (await userModel.findById(obj.user_id)).firstname;
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
  });

export default appRouter;
