<script setup lang="ts">
const props = defineProps<{
  itemID?: string;
}>();

import { reactive, onMounted } from "vue";

import itemIcon from "@/assets/icons/item.svg";
import addIcon from "@/assets/icons/add.svg";

import RemoveItems from "./RemoveItems.vue";
import HistoryRecord from "./HistoryRecord.vue";

import client from "@/utils/trpc";

const state = reactive({
  itemName: "",
  quantity: 0,
  position: "",
  projectName: "",
  history: [],
  tags: [],
});

const onUpdateQuantity = (newQuantity) => {
  state.quantity = newQuantity;
}

const emit = defineEmits(["closeItemInfoWindow"]);
const closeItemInfoWindow = () => emit("closeItemInfoWindow");

onMounted(async () => {
  const itemInfo = await client.query("getItemInfoByID", { itemID: props.itemID });
  console.log(props.itemID);

  state.quantity = itemInfo.quantity;
  state.itemName = itemInfo.name;
  state.position = itemInfo.position;
  state.projectName = itemInfo.project_name;
  state.history = itemInfo.history;
  state.tags = itemInfo.tags;
});
</script>

<template>
  <div class="overlay">
    <div class="window">
      <img :src="itemIcon" alt="Item" class="item-icon" />

      <main>
        <div class="top-part">
          <div class="item-info">
            <span class="name-info">
              <h1>{{ state.itemName }}</h1>
            </span>
            <p>{{ itemID }}</p>
          </div>

          <div class="quantity-container">Disponibilità: {{ state.quantity }}</div>

          <button class="close-button" @click="closeItemInfoWindow">
            <img :src="addIcon" alt="" />
          </button>
        </div>

        <div class="central-part">
          <div class="detailed-info">
            <p>Posizione: {{ state.position }}</p>
            <p>Nome progetto: {{ state.projectName }}</p>
            <p>Tags: {{ state.tags.join(", ") }}</p>
          </div>

          <RemoveItems :itemID="props.itemID" :currentQuantity="state.quantity" @updateQuantity="onUpdateQuantity"/>
        </div>

        <div class="bottom-part">
          <h1 class="title">Cronologia modifiche</h1>

          <span class="history-container">
            <div v-for="snapshot in state.history" :key="snapshot.key">
              <HistoryRecord :snapshot="snapshot" />
            </div>
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
  margin-top: auto;
  margin-bottom: auto;
  margin-left: auto;

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

.title {
  font-size: 1.5rem;
}

.bottom-part {
  overflow-y: scroll;
  height: 15rem;
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
  z-index: 1;
  overflow: hidden;

  display: flex;
  justify-content: center;
  align-items: center;
}

.window {
  background: #f5f9f6;
  padding: 1.5rem;
  display: inline-flex;

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
  margin-right: 2rem;
  font-size: 1.2rem;
  font-weight: 500;
}
.detailed-info > p {
  margin: 0;
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

@media screen and (min-width: 350px) and (max-width: 600px) {
  .top-part {
    gap: 0.5rem;
  }

  .central-part {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 1.5rem 0;
  }

  .item-icon {
    display: none;
    /* margin: 0.75rem;
    margin-bottom: auto;
    width: 32px;
    height: 32px; */
  }

  .window {
    padding: 2rem;
    width: 90%;
    height: 95%;
    overflow-y: scroll;
  }

  .close-button {
    width: 2.25rem;
    height: 2.25rem;
  }

  .close-button > img {
    width: 1.75rem;
    height: 1.75rem;
  }

  .quantity-container {
    font-size: 0.9rem;
    padding: 6px 12px;
  }

  .name-info > h1 {
    font-size: 1.25rem;
  }
}
</style>
