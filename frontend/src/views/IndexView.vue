<script setup lang="ts">
import LoginBox from "@/components/LoginBox.vue";
import Header from "@/components/Header.vue";
</script>

<template>
  <div class="index-page">
    <Header hideNav />

    <main>
      <LoginBox />
    </main>
  </div>
</template>

<style scoped>
.index-page {
  height: 100vh;
  background-image: url(../assets/index-background.png);
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
