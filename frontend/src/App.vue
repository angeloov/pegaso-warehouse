<script setup lang="ts">
import { RouterView } from "vue-router";
import client from "@/utils/trpc";
</script>

<template>
  <div>
    <RouterView />
  </div>
</template>

<style>
@import "@/assets/base.css";
</style>
