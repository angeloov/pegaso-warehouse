<script setup lang="ts">
import logo from "../assets/logo.svg";
</script>

<template>
  <header class="flex">
    <img :src="logo" alt="logo" class="pegasow-logo select-none" />
  </header>
</template>

<style scoped>
.pegasow-logo {
  width: 220px;
  margin: 2rem 3rem;
}

@media screen and (max-width: 500px) {
  .pegasow-logo {
    width: 180px;
    margin: 2rem auto;
  }
}
</style>
