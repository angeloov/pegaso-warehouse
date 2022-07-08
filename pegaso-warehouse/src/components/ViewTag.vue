<script setup lang="ts">
defineProps<{
  name: string;
}>();
</script>

<template>
  <div class="view-tag">{{ name }}</div>
</template>

<style>
.view-tag {
  background: #E6E6E6;
  font-size: 1.25rem;
  border-radius: 1rem;
  display: inline-block;
  padding: 0.5rem 1.2rem;
}
</style>
