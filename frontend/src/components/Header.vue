<script setup lang="ts">
defineProps<{
  hideNav?: boolean;
}>();

import logo from "@/assets/logo.svg";
import HamburgerMenu from "@/components/HamburgerMenu.vue";
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
        title="Ricerca"
        class="header-link"
        :class="{ 'is-blue': useRoute().name === 'search' }"
        to="/search"
        >Ricerca</RouterLink
      >
      <RouterLink
        title="QRCodes"
        class="header-link"
        :class="{ 'is-blue': useRoute().name === 'qrcodes' }"
        to="/qrcodes"
        >QRCodes</RouterLink
      >
    </span>

    <HamburgerMenu />
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

.header-link:hover {
  color: var(--primary-color);
  font-weight: 500;
}

.header-link {
  text-decoration: none;
  font-size: 1rem;
  font-weight: 400;
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

@media screen and (min-width: 350px) and (max-width: 600px) {
  .pegasow-logo {
    width: 180px;
    margin: 2rem;
  }

  .link-container {
    display: none !important;
    background: blueviolet;
  }
}
</style>
