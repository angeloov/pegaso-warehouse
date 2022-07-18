<script setup lang="ts">
import itemIcon from "@/assets/icons/item.svg";
import editIcon from "@/assets/icons/edit.svg";
import EditItemDialog from "@/components/EditItemDialog.vue";
import router from "@/router";

import { useDialog } from "primevue/usedialog";
const dialog = useDialog();

const props = defineProps<{
  itemName: string;
  id: string;
}>();

const emit = defineEmits(["openWindow"]);

const openItemInfoWindow = () => {
  emit("openWindow", props.id);
};

</script>

<template>
  <div class="search-view">
    <span class="left-container">
      <img :src="itemIcon" alt="item" />

      <div class="text">
        <p class="item-name">{{ itemName }}</p>
        <p class="item-desc">{{ id }}</p>
      </div>
    </span>

    <span class="right-container">
      <button class="action-button" @click="openItemInfoWindow">Vedi dettagli</button>
      <button class="edit-icon" @click="() => dialog.open(EditItemDialog, {})">
        <img :src="editIcon" alt="" />
      </button>
    </span>
  </div>
</template>

<style scoped>
.search-view {
  display: flex;
  justify-content: space-between;

  background: #fafafa;
  /* border: 1px solid #c0c0c0; */
  box-shadow: 0 0 0 0.75px #c0c0c0;
  padding: 1.25rem 1.5rem;
  border-radius: 1.25rem;
}

.left-container {
  display: flex;
}

.left-container > img {
  margin-right: 1rem;
}

.right-container {
  display: flex;
  place-items: center;
}

.action-button {
  border: 0;
  background: none;
  color: #1e6bc6;
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: 0;
}

.text p {
  margin: 0;
}

.action-button:hover {
  color: #2788ff;
  cursor: pointer;
}

.item-name {
  font-weight: 600;
  font-size: 1.2rem;
  color: #101010;
}

.item-desc {
  color: #4a4a4a;
}
</style>
