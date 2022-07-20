<script setup lang="ts">
import Header from "@/components/Header.vue";
import SearchResult from "@/components/SearchResult.vue";
import ItemInfoDialog from "@/components/ItemInfoDialog.vue";
import { reactive, watch } from "vue";
import client from "@/utils/trpc";

import EditItemDialog from "@/components/EditItemDialog.vue";

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
  editWindowIsOpen: false,
  itemID: null,
});

const onOpenItemInfoWindow = id => {
  windowState.itemInfoWindowIsOpen = true;
  windowState.itemID = id;
};

const onCloseItemInfoWindow = () => {
  windowState.itemInfoWindowIsOpen = false;
};

const onOpenEditItemWindow = id => {
  windowState.editWindowIsOpen = true;
  windowState.itemID = id;
};

const onCloseEditItemWindow = () => {
  windowState.editWindowIsOpen = false;
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

</script>

<template>
  <div>
    <Header />
    <EditItemDialog
      v-if="windowState.editWindowIsOpen"
      @closeEditItemWindow="onCloseEditItemWindow"
      :id="windowState.itemID"
    />

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

          <div class="tags-container">
            <label for="item-name">Tags</label>

            <Chips v-model="state.tags" class="tags-field" separator="," />
            <Button class="tags-button" type="submit" label="Cerca" />
          </div>
        </div>
      </form>

      <div class="results-container">
        <span v-for="result in state.searchResult" :key="result._id">
          <SearchResult
            @openItemInfoWindow="onOpenItemInfoWindow"
            @openEditItemWindow="onOpenEditItemWindow"
            :itemName="result.name"
            :id="result._id"
          />
        </span>
      </div>
    </main>

    <ItemInfoDialog
      v-if="windowState.itemInfoWindowIsOpen"
      :itemID="windowState.itemID"
      @closeItemInfoWindow="onCloseItemInfoWindow"
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
  display: grid;
}

.tags-button{
  margin-top: 1rem;
  margin-left: auto;
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

@media screen and (min-width: 400px) and (max-width: 1300px) {
  .input-container {
    grid-template-columns: 1fr;
  }

  .tags-container {
    display: grid;
    grid-template-columns: 1fr;
  }
 
}
</style>
