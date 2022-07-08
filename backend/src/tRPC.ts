import * as trpc from "@trpc/server";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import passport from "passport";
import jwt from "jsonwebtoken";
import * as utils from "./jwt/utils";
import type { Context } from "index";

const appRouter = trpc
  .router()
  .query("hello", {
    resolve() {
      return { text: "ciao" };
    },
  })
  .query("getMyInfo", {
    async resolve({ input, ctx }) {
      if (ctx.jwt) return await utils.getUserInfo(ctx.jwt);

      return new TRPCError({
        code: "UNAUTHORIZED",
      });
    },
  });

export default appRouter;
