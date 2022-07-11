import type { AppRouter } from "../../../backend/src/index";
import { createTRPCClient } from "@trpc/client";

const client = createTRPCClient<AppRouter>({
  url: "http://localhost:4000/trpc",
  headers: () => {
    return {
      Authorization: localStorage.getItem("accessToken"),
    };
  },
});

export default client;
