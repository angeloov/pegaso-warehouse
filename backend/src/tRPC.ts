import * as trpc from "@trpc/server";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import * as utils from "./jwt/utils";
import type { Context } from "./index";

import jwt from "jsonwebtoken";

import itemModel from "./mongoose/Item";
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
      return await itemModel.findById(input.itemID);
    },
  })
  .mutation("editItem", {
    input: z.object({
      itemID: z.string(),
      edits: z.object({
        name: z.string().optional(),
        quantity: z.number().optional(),
        position: z.string().optional(),
        tags: z.string().array().optional(),
        projectName: z.string().optional(),
      }),
    }),
    async resolve({ ctx, input }) {
      console.log(input);
      // TODO: When adding something to history append it to the start of the array so the last changes are at the beginning
      if (Object.keys(input.edits).length > 0) {
        await itemModel.updateOne(
          { _id: input.itemID },
          {
            name: input.edits.name,
            quantity: input.edits.quantity,
            position: input.edits.position,
            project_name: input.edits.projectName,
          }
        );
      }
    },
  });

export default appRouter;
