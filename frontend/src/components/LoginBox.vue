<script setup lang="ts">
import { reactive } from "vue";
import client from "@/utils/trpc";
import router from "../router/index";

import { useUserDataStore } from "@/stores/userData";

const state = reactive({ username: "", password: "" });
const userData = useUserDataStore();

const onFormSubmit = async () => {
  const res = await fetch("http://localhost:4000/login", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: state.username, password: state.password }),
  });

  const data = await res.json();

  if (data.success) {
    localStorage.setItem("accessToken", data.accessToken);

    const userInfo = await client.query("getMyInfo");
    console.log(userInfo);
    if (userInfo) {
      userData.username = userInfo.username;
      userData.firstName = userInfo.firstname;
      userData.id = userInfo._id;
    } else {
      throw new Error("Error in login");
    }

    router.push("/home");
  } else {
    console.log(data);
  }
};
</script>

<template>
  <div class="login-box">
    <h1 class="main-title">Login</h1>

    <form @submit.prevent="onFormSubmit">
      <span class="p-float-label">
        <InputText id="username" type="text" v-model="state.username" />
        <label for="username">Username</label>
      </span>

      <span class="p-float-label">
        <Password id="password" v-model="state.password" :feedback="false" />
        <label for="password">Password</label>
      </span>

      <Button type="submit" label="Submit" />
    </form>
  </div>
</template>

<style scoped>
#username {
  margin: auto;
}
.login-box {
  background: #f1f1f166;
  /* filter: blur(1px); */
  /* backdrop-filter: blur(40px); */
  border-radius: 2rem;
  padding: 2rem 4rem;
}
.main-title {
  font-weight: 700;
  text-align: center;
  margin-bottom: 3rem;
}

.p-float-label {
  margin: 1.8rem 0;
}

.field * {
  display: block;
}
</style>
