<script setup lang="ts">
import router from "@/router";

defineProps<{
  name: string;
}>();
</script>

<template>
  <button @click="() => router.push('/search')" class="view-tag">{{ name }}</button>
</template>

<style>
.view-tag {
  background: #e6e6e6;
  font-size: 1.25rem;
  border-radius: 1rem;
  display: inline-block;
  padding: 0.5rem 1.2rem;
  border: 0;
  cursor: pointer;
}
</style>
