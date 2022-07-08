<script setup lang="ts">
import Header from "@/components/Header.vue";
import addComponentIcon from "@/assets/icons/component-add.svg";
import addItemIcon from "@/assets/icons/box-add.svg";
import ViewTag from "../components/ViewTag.vue";

console.log(addComponentIcon);
</script>

<template>
  <div>
    <Header />

    <main>
      <div class="button-container">
        <Button type="button" class="primary-btn">
          <img alt="logo" :src="addComponentIcon" />
          <span class="ml-3 font-bold text-xl">Aggiungi componente</span>
        </Button>

        <Button type="button" class="primary-btn">
          <img alt="logo" :src="addItemIcon" />
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
}
.objects-container {
  margin-top: 4rem;
}

.objects-container > span {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
.objects-container h2 {
  font-weight: 700;
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
