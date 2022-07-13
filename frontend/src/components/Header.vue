<script setup lang="ts">
defineProps<{
  hideNav?: boolean;
}>()


import logo from "@/assets/logo.svg";
import { RouterLink } from "vue-router";
import { useRoute } from "vue-router";
</script>

<template>
  <header class="flex">
    <img :src="logo" alt="logo" class="pegasow-logo select-none" />

    <span class="link-container" v-if="!hideNav">
      <RouterLink
        title="Home"
        class="header-link"
        :class="{ 'is-blue': useRoute().name === 'home' }"
        to="/home"
        >Home</RouterLink
      >
      <RouterLink
        title="Search"
        class="header-link"
        :class="{ 'is-blue': useRoute().name === 'search' }"
        to="/search"
        >Search</RouterLink
      >
      <RouterLink
        title="QRCodes"
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

@media screen and (max-width: 580px) {
  .pegasow-logo {
    width: 180px;
    margin: 2rem auto;
  }

  .link-container {
    display: none !important;
    background: blueviolet;
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

.header-link::before {
  display: block;
  content: attr(title);
  font-weight: bold;
  height: 0;
  overflow: hidden;
  visibility: hidden;
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
