<script setup lang="ts">
// defineProps<{
//   msg: string;
// }>();

import { reactive } from "vue";

const state = reactive({ username: "", password: "" });

const onSubmit = () => {
  console.log(state);
};
</script>

<template>
  <div class="login-box">
    <h1 class="main-title">Login</h1>

    <form @submit.prevent="onSubmit()">
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

    <p>{{ state.username }}</p>
    <p>{{ state.password }}</p>
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
