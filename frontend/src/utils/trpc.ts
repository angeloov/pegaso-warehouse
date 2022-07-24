import type { AppRouter } from "../../../backend/src/index";
import { createTRPCClient } from "@trpc/client";

const client = createTRPCClient<AppRouter>({
  url: `${import.meta.env.BACKEND_URI}/trpc`,
  headers: () => {
    return {
      Authorization: localStorage.getItem("accessToken"),
    };
  },
});

export default client;
