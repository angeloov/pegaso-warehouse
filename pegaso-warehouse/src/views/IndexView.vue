<script setup lang="ts">
import logo from "../assets/logo.svg";
import LoginBox from "@/components/LoginBox.vue";
</script>

<template>
  <div class="index-page">
    <header>
      <img :src="logo" alt="logo" class="pegasow-logo" />
    </header>

    <main>
      <LoginBox />
    </main>
  </div>
</template>

<style scoped>
.pegasow-logo {
  width: 220px;
  margin: 2rem 3rem;
}

.index-page {
  height: 100vh;
  background-image: url(../assets/index-background.jpg);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

main {
  margin-top: 2rem;
  display: grid;
  place-items: center;
}
</style>
