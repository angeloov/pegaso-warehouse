<script setup lang="ts">
import { RouterView } from "vue-router";
import client from "@/utils/trpc";
</script>

<template>
  <div>
    <Suspense>
      <RouterView />
    </Suspense>
  </div>
</template>

<style>
@import "@/assets/base.css";
</style>
