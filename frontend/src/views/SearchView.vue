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
  searchResult: [],
});

const onFormSubmit = async () => {
  const res = await client.query("search", {
    itemName: state.itemName,
    projectName: state.projectName,
    position: state.position,
    // tags: [],
  });

  state.searchResult = res;
  console.log(res);
};
</script>

<template>
  <div>
    <Header />

    <main>
      <h1 class="welcome-title">Ricerca</h1>

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

      <span v-if="state.searchResult" v-for="result in state.searchResult">
        <SearchResult :itemName="result.name" />
      </span>
    </main>
  </div>
</template>

<style scoped>
.welcome-title {
  font-weight: 600;
}

main {
  margin: 0 3rem;
  margin-top: 1rem;
}
</style>
