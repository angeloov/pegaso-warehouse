<script setup lang="ts">
import Header from "@/components/Header.vue";
import SearchResult from "@/components/SearchResult.vue";
import ItemInfo from "@/components/ItemInfo.vue";
import { reactive } from "vue";
import client from "@/utils/trpc";

const state = reactive({
  itemName: "",
  projectName: "",
  position: "",
  tags: [],
  searchResult: [],
});

const openedItemState = reactive({
  itemName: "",
});

const onFormSubmit = async () => {
  const res = await client.query("search", {
    itemName: state.itemName.trim(),
    projectName: state.projectName.trim(),
    position: state.position.trim(),
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
        <div class="input-container">
          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText
              type="text"
              class="input-field"
              v-model="state.itemName"
              placeholder="Nome oggetto"
              autocomplete="off"
              autocorrect="off"
              spellcheck="false"
            />
          </span>

          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText
              type="text"
              class="input-field"
              v-model="state.projectName"
              placeholder="Nome progetto"
              autocomplete="off"
              autocorrect="off"
              spellcheck="false"
            />
          </span>

          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText
              type="text"
              class="input-field"
              v-model="state.position"
              placeholder="Posizione"
              autocomplete="off"
              autocorrect="off"
              spellcheck="false"
            />
          </span>
        </div>

        <div class="tags-container">
          <label for="item-name">Tags</label>

          <Chips v-model="state.tags" class="tags-field" separator="," />
          <Button type="submit" label="Invia" />
        </div>
      </form>

      <div class="results-container">
        <span v-for="result in state.searchResult">
          <SearchResult :itemName="result.name" :id="result._id" :key="result._id" />
        </span>
      </div>
    </main>

    <ItemInfo />
  </div>
</template>

<style scoped>
.welcome-title {
  font-weight: 600;
}

.input-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1.5rem;

  margin-bottom: 1rem;
}
.input-field {
  min-width: 100%;
}

.results-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.tags-container {
  margin-bottom: 1rem;
}

.tags-field {
  width: 100% !important;
}
.tags-field > ul {
  width: 100% !important;
}

main {
  margin: 0 3rem;
  margin-top: 1rem;
}

label {
  color: var(--primevue-gray);
  margin-left: 4px;
}
</style>
