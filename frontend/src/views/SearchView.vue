<script setup lang="ts">
import Header from "@/components/Header.vue";
import SearchResult from "@/components/SearchResult.vue";
import { reactive } from "vue";
import client from "@/utils/trpc";

const state = reactive({
  itemName: "",
  projectName: "",
  position: "",
  tags: [],
});

const onFormSubmit = async () => {
  const res = await client.query("search", {
    itemName: state.itemName,
    projectName: state.projectName,
    position: state.position,
    // tags: [],
  });

  console.log(res);
};
</script>

<template>
  <div>
    <Header />

    <main>
      <h1 class="welcome-title">Search page</h1>

      <form @submit.prevent="onFormSubmit">
        <span class="p-input-icon-left">
          <i class="pi pi-search" />
          <InputText type="text" v-model="state.itemName" placeholder="Nome oggetto" />
        </span>

        <span class="p-input-icon-left">
          <i class="pi pi-search" />
          <InputText type="text" v-model="state.projectName" placeholder="Nome progetto" />
        </span>

        <span class="p-input-icon-left">
          <i class="pi pi-search" />
          <InputText type="text" v-model="state.position" placeholder="Posizione" />
        </span>

        <span>
          <Chips v-model="state.tags" separator="," />
        </span>

        <Button type="submit" value="Invia" />
      </form>

      <SearchResult itemName="Prova" />
      <SearchResult itemName="Ciao" />
      <SearchResult itemName="Ciao" />
    </main>
  </div>
</template>

<style>
.welcome-title {
  font-weight: 600;
}

main {
  margin: 0 3rem;
  margin-top: 1rem;
}
</style>
