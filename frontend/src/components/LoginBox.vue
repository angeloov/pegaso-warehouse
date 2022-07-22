<script setup lang="ts">
import { reactive } from "vue";
import client from "@/utils/trpc";
import router from "../router/index";

import { useUserDataStore } from "@/stores/userData";

import { useToast } from "primevue/usetoast";
const toast = useToast();

const state = reactive({ username: "", password: "" });
const userData = useUserDataStore();

const showError = (err: string) => {
  toast.add({ severity: "error", summary: "Errore", detail: err, life: 3500 });
};

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
    showError(data.message);
    console.log(data);
  }
};
</script>

<template>
  <div class="login-box">
    <Toast />
    <h1 class="main-title">Login</h1>

    <form @submit.prevent="onFormSubmit">
      <span class="p-float-label">
        <InputText
          id="username"
          type="text"
          v-model="state.username"
          autocomplete="off"
          autocorrect="off"
          autocapitalize="off"
          spellcheck="false"
        />
        <label for="username">Username</label>
      </span>

      <span class="p-float-label">
        <Password id="password" v-model="state.password" :feedback="false" />
        <label for="password">Password</label>
      </span>

      <Button type="submit" label="Login" />
    </form>
  </div>
</template>

<style scoped>
#username {
  margin: auto;
}
.login-box {
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(12px) saturate(180%);
  background-color: rgba(198, 198, 198, 0.5);
  border-radius: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.125);

  border-radius: 2rem;
  padding: 2rem 4rem;
}
.main-title {
  font-weight: 700;
  text-align: center;
  margin-bottom: 3rem;
  color: #fafafa;
}

.p-float-label {
  margin: 1.8rem 0;
  color: #fafafa;
}

.field * {
  display: block;
}
</style>
