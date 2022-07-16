<script setup lang="ts">
import LoginBox from "@/components/LoginBox.vue";
import Header from "@/components/Header.vue";
</script>

<template>
  <div class="index-page">
    <Header hideNav isWhite />

    <main>
      <LoginBox />
    </main>
  </div>
</template>

<style scoped>
.index-page {
  height: 100vh;
  /* background-image: url(../assets/index-background.png); */
  background-image: url(https://images.unsplash.com/photo-1519681393784-d120267933ba?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1124&q=100);
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
