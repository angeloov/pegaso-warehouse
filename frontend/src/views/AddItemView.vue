<script setup lang="ts">
import Header from "@/components/Header.vue";
import { reactive } from "vue";
import client from "@/utils/trpc";
import { useUserDataStore } from "@/stores/userData";

import { useToast } from "primevue/usetoast";
const toast = useToast();

const userData = useUserDataStore();
console.log(userData.firstName);

const state = reactive({
  name: "",
  quantity: 0,
  position: "",
  tags: [],
  projectName: "",
  website: "",
  partNumber: "",
});

const onFormSubmit = async () => {
  try {
    const res = await client.mutation("createItem", {
      name: state.name,
      quantity: state.quantity,
      position: state.position,
      tags: state.tags,
      projectName: state.projectName,
    });

    toast.add({
      severity: "success",
      summary: "Successo",
      detail: `Oggetto "${state.name}" aggiunto`,
      life: 3000,
    });
  } catch (err) {
    toast.add({
      severity: "error",
      summary: "Errore",
      detail: err.message,
      life: 3000,
    });
  }
};
</script>

<template>
  <div>
    <Header position="top-left" group="tl" />
    <Toast />

    <main>
      <h1 class="welcome-title">Aggiungi oggetto</h1>

      <form @submit.prevent="onFormSubmit" class="input-container">
        <div class="field">
          <label for="item-name">Nome</label>
          <InputText
            id="item-name"
            v-model="state.name"
            type="text"
            aria-describedby="item-name-help"
          />
        </div>

        <div class="field">
          <label for="stacked">Quantità</label>
          <InputNumber
            id="quantity"
            v-model="state.quantity"
            pattern="[0-9]*"
            showButtons
            mode="decimal"
            :min="0"
            :max="100"
          />
        </div>

        <div class="field">
          <label for="posizione">Posizione (opzionale)</label>
          <InputText
            id="posizione"
            v-model="state.position"
            type="text"
            aria-describedby="posizione-help"
          />
        </div>

        <div class="field">
          <label for="name">Tags (separati da virgole) (opzionale) </label>
          <Chips v-model="state.tags" separator="," />
        </div>

        <div class="field">
          <label for="project-name">Nome progetto (opzionale)</label>
          <InputText
            id="project-name"
            v-model="state.projectName"
            type="text"
            aria-describedby="project-name-help"
          />
        </div>

        <Button type="submit" label="Aggiungi" />
      </form>
    </main>
  </div>
</template>

<style scoped>
main {
  margin: 0 3rem;
  margin-top: 1rem;
}

label {
  color: var(--primevue-gray);
  display: block !important;
}

.welcome-title {
  font-weight: 600;
}

.input-container {
  margin-top: 1rem;
}
</style>
