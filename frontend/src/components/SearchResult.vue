<script setup lang="ts">
defineProps<{
  itemName: string;
}>();

import itemIcon from "@/assets/icons/item.svg";
</script>

<template>
  <div class="search-view">
    <span class="left-container">
      <img :src="itemIcon" alt="item" />

      <div>
        <p>{{ itemName }}</p>
        <p>PF456V/</p>
      </div>
    </span>
    <button class="action-button">Vedi dettagli</button>
  </div>
</template>

<style>
.search-view {
  display: flex;
  justify-content: space-between;

  background: #fafafa;
  border: 0.5px solid #c0c0c0;
  padding: 1rem;
  border-radius: 1rem;
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
  letter-spacing: -0.02em;
}

.action-button:hover {
  color: #2788ff;
  cursor: pointer;
}
</style>
