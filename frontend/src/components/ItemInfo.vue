<script setup lang="ts">
import itemIcon from "@/assets/icons/item.svg";
import editIcon from "@/assets/icons/edit.svg";
import addIcon from "@/assets/icons/add.svg";

import RemoveItems from "./RemoveItems.vue";
import HistoryRecord from "./HistoryRecord.vue";

import { reactive } from "vue";

const state = reactive({
  isClosed: false,
});
</script>

<template>
  <div class="overlay" :class="{ hidden: state.isClosed }">
    <div class="window">
      <img :src="itemIcon" alt="Item" class="item-icon" />

      <main>
        <div class="top-part">
          <div class="item-info">
            <span class="name-info">
              <h1>L7805CV</h1>
            </span>
            <p>AA000</p>
          </div>

          <div class="quantity-container">Disponibilità: 12</div>

          <button class="edit-icon">
            <img :src="editIcon" alt="" />
          </button>

          <button class="close-button" @click="() => (state.isClosed = !state.isClosed)">
            <img :src="addIcon" alt="" />
          </button>
        </div>

        <div class="central-part">
          <div class="detailed-info">
            <p>Posizione: Pegaso</p>
            <p>Nome progetto: nome</p>
            <p>Tags: nome</p>
          </div>

          <RemoveItems />
        </div>

        <div class="bottom-part">
          <h1 class="title">Cronologia modifiche</h1>

          <span class="history-container">
            <HistoryRecord />
          </span>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
.hidden {
  display: none;
}
main {
  width: 100%;
}

.close-button {
  border: 0;
  margin: 0;
  margin-bottom: auto;
  padding: 0;
  line-height: normal;
  background: #e8e8e8;
  border-radius: 1000rem;

  position: relative;
  width: 3.5rem;
  height: 3.5rem;
}

.close-button > img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(45deg);
  width: 3rem;
  height: 3rem;
  cursor: pointer;
}

.edit-icon {
  margin-left: auto;
  margin-top: auto;
  margin-bottom: auto;
}

.bottom-part > .title {
  margin-bottom: 1rem;
}

.menu-container {
  margin-left: auto;
}
.overlay {
  position: absolute;
  background: #20202069;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.window {
  background: #f5f9f6;
  padding: 1.5rem;
  display: flex;

  margin: 8rem;
  border-radius: 2rem;
}
.item-icon {
  margin: 1rem;
  margin-right: 2rem;
  margin-bottom: auto;
}

.item-info > p,
h1 {
  margin: 0;
}

.top-part {
  display: flex;
  gap: 1.5rem;
}

.edit-button {
  margin-bottom: auto;
  background: none;
  border: 0;
  cursor: pointer;
}

.name-info > * {
  display: inline-block;
}

.detailed-info {
  margin: 2rem 0;
}
.detailed-info > p {
  margin: 0;
  font-weight: 500;
  font-size: 1rem;
}

.quantity-container {
  background: #3cc31a;
  padding: 0.5rem 1rem;
  color: #f5f9f6;
  font-weight: 500;
  border-radius: 1rem;

  margin: auto 0;
}

.central-part {
  display: flex;
  width: 100%;
  margin: 1.5rem 0;
}
</style>
