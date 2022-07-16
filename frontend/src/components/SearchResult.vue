<script setup lang="ts">
import itemIcon from "@/assets/icons/item.svg";
import router from "@/router";

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
    <button class="action-button" @click="openItemInfoWindow">Vedi dettagli</button>
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
