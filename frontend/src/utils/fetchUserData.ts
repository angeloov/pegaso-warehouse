import { useUserDataStore } from "@/stores/userData";
import client from "@/utils/trpc";

// Populate the global state with user info
export default async () => {
  const userData = useUserDataStore();

  if (localStorage.getItem("accessToken")) {
    const userInfo = await client.query("getMyInfo");
    
    userData.firstName = userInfo.firstname;
    userData.username = userInfo.username;
    userData.id = userInfo._id;
    console.log(userData)
  }

};
