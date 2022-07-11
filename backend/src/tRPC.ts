import * as trpc from "@trpc/server";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import * as utils from "./jwt/utils";
import type { Context } from "./index";

import itemModel from "./mongoose/Item";

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
      console.log(input);

      await itemModel.create({
        _id: "AA001", // ID
        name: input.name,
        quantity: input.quantity,
        position: input.position,
        tags: input.tags,
        project_name: input.projectName,
        history: [
          {
            user_id: "62c6c383b6aabd9606717162", // User id
            date: new Date(),
          },
        ],
        website: input.website,
        part_number: input.partNumber,
      });
    },
  });

export default appRouter;
