import type { AppRouter } from "../../../backend/src/index";
import { createTRPCClient } from "@trpc/client";
import { useUserDataStore } from "@/stores/userData";

const client = createTRPCClient<AppRouter>({
  url: "http://localhost:4000/trpc",
  headers: () => {
    const userData = useUserDataStore();
    return {
      Authorization: userData.accessToken,
    };
  },
});

export default client;
