<script setup lang="ts">
import { RouterView, useRoute } from "vue-router";
const route = useRoute();
</script>

<template>
  <div>
    <RouterView :key="route.fullPath"/>
  </div>
</template>

<style>
@import "@/assets/base.css";
</style>
