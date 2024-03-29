<script setup lang="ts">
import addIcon from "@/assets/icons/add.svg";
import client from "@/utils/trpc";
import { reactive } from "vue";

const props = defineProps<{
  id: string;
}>();

const emit = defineEmits(["closeEditItemWindow"]);
const onCloseEditItemWindow = () => {
  emit("closeEditItemWindow");
};

import { useToast } from "primevue/usetoast";
const toast = useToast();

const oldItemInfo = reactive({
  name: "",
  quantity: "",
  position: "",
  tags: [],
  projectName: "",
});

const newItemInfo = reactive({
  name: "",
  quantity: "",
  position: "",
  tags: [],
  projectName: "",
});

// Fetch data to modify
const populateState = async () => {
  const res = await client.query("getItemInfoByID", {
    itemID: props.id,
  });

  console.log(res);

  oldItemInfo.name = res.name;
  oldItemInfo.quantity = res.quantity;
  oldItemInfo.position = res.position;
  oldItemInfo.tags = res.tags;
  oldItemInfo.projectName = res.project_name;

  newItemInfo.name = res.name;
  newItemInfo.quantity = res.quantity;
  newItemInfo.position = res.position;
  newItemInfo.tags = res.tags;
  newItemInfo.projectName = res.project_name;
};

populateState();

const showSuccess = () => {
  toast.add({
    severity: "success",
    summary: "Successo",
    detail: "Oggetto modificato con successo",
    life: 3000,
  });
};

const showError = (err: string) => {
  toast.add({
    severity: "error",
    summary: "Errore",
    detail: err,
    life: 3000,
  });
};

const onFormSubmit = async () => {
  try {
    await client.mutation("editItem", {
      itemID: props.id,
      edits: {
        name: newItemInfo.name != oldItemInfo.name ? newItemInfo.name : null,
        quantity:
          newItemInfo.quantity != oldItemInfo.quantity ? parseInt(newItemInfo.quantity) : null,
        position: newItemInfo.position != oldItemInfo.position ? newItemInfo.position : null,
        tags: newItemInfo.tags.toString() !== oldItemInfo.tags.toString() ? newItemInfo.tags : null,
        projectName:
          newItemInfo.projectName != oldItemInfo.projectName ? newItemInfo.projectName : null,
      },
    });

    populateState();
    showSuccess();
  } catch (err: Error) {
    showError(err.message);
  }
};
</script>

<template>
  <div class="dialog">
    <div class="window">
      <Toast />

      <div class="close-container">
        <h2 class="title">Modifica</h2>
        <button class="close-button" @click="onCloseEditItemWindow">
          <img :src="addIcon" alt="" />
        </button>
      </div>

      <form @submit.prevent="onFormSubmit">
        <div class="field">
          <label for="name" class="label">Nome oggetto</label>
          <InputText type="text" aria-describedby="name-input" v-model="newItemInfo.name" />
        </div>

        <div class="field">
          <label for="quantity" class="label">Quantità</label>
          <InputText type="text" aria-describedby="quantity-input" v-model="newItemInfo.quantity" />
        </div>

        <div class="field">
          <label for="position" class="label">Posizione</label>
          <InputText type="text" aria-describedby="position-input" v-model="newItemInfo.position" />
        </div>

        <div class="field">
          <label for="tags" class="label">Tags</label>
          <InputText type="text" aria-describedby="tags-input" />
        </div>

        <div class="field">
          <label for="tags" class="label">Nome progetto</label>
          <InputText
            type="text"
            aria-describedby="project-name-input"
            v-model="newItemInfo.projectName"
          />
        </div>

        <Button type="submit" label="Invia" />
      </form>
    </div>
  </div>
</template>

<style scoped>
.dialog {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  z-index: 1;
  background: #20202069;

  display: grid;
  place-items: center;
}

.title {
  margin-top: 0;
}
.window {
  background: #f5f9f6;
  display: inline-block;
  padding: 2rem;
  border-radius: 1rem;
}
.close-container {
  display: flex;
}

.close-button {
  border: 0;
  margin: auto;
  margin-right: 0;

  padding: 0;
  line-height: normal;
  background: #e8e8e8;
  border-radius: 1000rem;

  position: relative;
  width: 2.5rem;
  height: 2.5rem;
}

.close-button > img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(45deg);
  width: 2rem;
  height: 2rem;
  cursor: pointer;
}
.label {
  display: block;
  color: #495057;
  font-size: 0.9rem;
}
</style>
