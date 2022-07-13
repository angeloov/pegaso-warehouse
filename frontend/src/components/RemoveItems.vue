<script setup lang="ts">
import { reactive } from "vue";
import addIcon from "@/assets/icons/add.svg";
import minusIcon from "@/assets/icons/minus.svg";

const state = reactive({
  itemsToRemove: 0,
});
</script>

<template>
  <div class="remove-items-container">
    <p class="title">Rimuovi articoli dal magazzino</p>

    <div class="inner">
      <!-- Add here: button disabled if itemsToRemove > quantity -->
      <button @click="() => state.itemsToRemove++" class="count-btn">
        <img :src="addIcon" alt="" />
      </button>
      <div class="counter">
        {{ state.itemsToRemove }}
      </div>
      <button
        @click="() => state.itemsToRemove--"
        :disabled="state.itemsToRemove === 0"
        class="count-btn"
      >
        <img :src="minusIcon" alt="" style="fill: inherit" />
      </button>
    </div>

    <div class="button-container">
      <Button label="Rimuovi" />
    </div>
  </div>
</template>

<style scoped>
.title {
  margin-top: 0;
  font-weight: 500;
}
.inner {
  display: flex;
  justify-content: center;
  gap: 8px;
}

.remove-items-container {
  padding: 1.5rem;
  border: 1px solid #d9d9d9;
  border-radius: 1rem;
  margin-left: auto;
}

.count-btn {
  background: #e8e8e8;
  border: 0;
  padding: 0.25rem;
  border-radius: 8px;
  margin: auto 0;
  cursor: pointer;
}

.count-btn:hover {
  background: #dddddd
}

.counter {
  background: #e8e8e8;
  padding: 1rem;
  font-weight: 600;
  font-size: 1.5rem;
  border-radius: 1rem;
  line-height: normal;
}

.button-container {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}
</style>
