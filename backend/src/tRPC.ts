import * as trpc from "@trpc/server";
import { z } from "zod";

const appRouter = trpc.router().query("hello", {
  resolve(req) {
    return { text: "ciao" };
  },
});



export default appRouter;