<script setup lang="ts">
import { RouterView, useRoute } from "vue-router";
import router from "@/router";
const route = useRoute();

if (!localStorage.getItem("accessToken"))
  router.push("/");
</script>

<template>
  <div>
    <RouterView :key="route.fullPath" />
  </div>
</template>

<style>
@import "@/assets/base.css";
</style>
