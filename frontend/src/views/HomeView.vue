<script setup lang="ts">
import Header from "@/components/Header.vue";
import addComponentIcon from "@/assets/icons/add-item.svg";
import ViewTag from "../components/ViewTag.vue";

import router from "@/router";

import { useUserDataStore } from "@/stores/userData";
const userData = useUserDataStore();

const getRandomEmoji = () => {
  const emojis = ["👋", "😀", "🥳", "🎉"];
  return emojis[Math.floor(Math.random() * emojis.length)];
};
</script>

<template>
  <div>
    <Header />

    <main>
      <h1 class="welcome-title">
        Ciao, {{ userData.firstName }} {{ getRandomEmoji() }}
      </h1>

      <div class="button-container">
        <Button @click="() => router.push('/add')" type="button" class="primary-btn">
          <img alt="logo" :src="addComponentIcon" class="primary-btn-icon" />
          <span class="ml-3 font-bold text-xl">Aggiungi oggetto</span>
        </Button>
      </div>

      <div class="objects-container">
        <h2>Oggetti in magazzino</h2>

        <span>
          <ViewTag name="PC" />
          <ViewTag name="Transistor" />
          <ViewTag name="Oscilloscopio" />
        </span>
      </div>
    </main>
  </div>
</template>

<style scoped>
main {
  margin: 0 3rem;
  margin-top: 1rem;
}

.primary-btn-icon {
  width: 32px;
}

.welcome-title {
  font-weight: 600;
}
.primary-btn {
  border-radius: 1.25rem;
  display: flex;
  justify-content: center;
  flex-grow: 1;
}

.button-container {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  margin-bottom: 4rem;
}

.objects-container > span {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
.objects-container h2 {
  font-weight: 600;
  margin-bottom: 1rem;
}

@media screen and (max-width: 500px) {
  .button-container {
    flex-direction: column;
  }

  main {
    margin: 0 1rem;
  }
}
</style>
