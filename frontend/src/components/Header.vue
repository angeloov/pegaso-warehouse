<script setup lang="ts">
import logo from "@/assets/logo.svg";
import { RouterLink } from "vue-router";
import { useRoute } from "vue-router";
import { log } from "console";
</script>

<template>
  <header class="flex">
    <img :src="logo" alt="logo" class="pegasow-logo select-none" />

    <span class="link-container">
      <RouterLink class="header-link" :class="{ 'is-blue': useRoute().name === 'home' }" to="/home"
        >Home</RouterLink
      >
      <RouterLink
        class="header-link"
        :class="{ 'is-blue': useRoute().name === 'search' }"
        to="/search"
        >Search</RouterLink
      >
      <RouterLink
        class="header-link"
        :class="{ 'is-blue': useRoute().name === 'qrcodes' }"
        to="/qrcodes"
        >QRCodes</RouterLink
      >
    </span>
  </header>
</template>

<style scoped>
header {
  align-items: center;
}
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

.header-link:hover {
  color: var(--primary-color);
  font-weight: 500;
}
.header-link {
  text-decoration: none;
  font-size: 1rem;
  color: var(--light-gray);
}

.is-blue {
  color: var(--primary-color);
  font-weight: 500;
}

.link-container {
  display: flex;
  margin-left: auto;
  margin-right: 3rem;
  gap: 1rem;
}
</style>
