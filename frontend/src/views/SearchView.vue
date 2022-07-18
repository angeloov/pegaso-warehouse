<script setup lang="ts">
import Header from "@/components/Header.vue";
import SearchResult from "@/components/SearchResult.vue";
import ItemInfo from "@/components/ItemInfo.vue";
import { reactive, watch } from "vue";
import client from "@/utils/trpc";

import { useRoute } from "vue-router";
import router from "@/router";

const route = useRoute();

const { itemName, projectName, position, tags } = route.query;

const state = reactive({
  itemName: itemName ?? "",
  projectName: projectName ?? "",
  position: position ?? "",
  tags: tags ? tags.split(",") : [],
  searchResult: [],
});

const windowState = reactive({
  itemInfoWindowIsOpen: false,
  itemID: null,
});

const onOpenWindow = id => {
  windowState.itemInfoWindowIsOpen = true;
  windowState.itemID = id;
};

const onCloseWindow = id => {
  windowState.itemInfoWindowIsOpen = false;
};

(async () => {
  if (state.itemName || state.projectName || state.position || state.tags.length > 0) {
    state.searchResult = await client.query("search", {
      itemName: state.itemName.trim(),
      projectName: state.projectName.trim(),
      position: state.position.trim(),
      // tags: [],
    });
  }
})();

const onFormSubmit = async () => {
  router.push({
    path: "/search",
    query: {
      itemName: state.itemName.trim(),
      projectName: state.projectName.trim(),
      position: state.position.trim(),
      tags: state.tags.join(","),
    },
  });
};

// onFormSubmit();
</script>

<template>
  <div>
    <Header />
    <DynamicDialog />

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
          <Button type="submit" label="Cerca" />
        </div>
      </form>

      <div class="results-container">
        <span v-for="result in state.searchResult" :key="result._id">
          <SearchResult @openWindow="onOpenWindow" :itemName="result.name" :id="result._id" />
        </span>
      </div>
    </main>

    <ItemInfo
      v-if="windowState.itemInfoWindowIsOpen"
      :itemID="windowState.itemID"
      @closeWindow="onCloseWindow"
    />
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
