<script setup lang="ts">
defineProps<{
  isPrinted: boolean;
}>();
import itemIcon from "@/assets/icons/item.svg";
</script>

<template>
  <div class="item-container">
    <div class="title-container">
      <img :src="itemIcon" :class="{ grayIcon: isPrinted }" class="img" />
      <div class="item-info">
        <h1 :class="{ gray: isPrinted }" class="big-title">PC HP</h1>
        <p :class="{ gray: isPrinted }" class="small-title">Pc portatile</p>
      </div>
    </div>
    <button class="button">Stampa QRCode</button>
  </div>
</template>

<style scoped>
.item-container {
  display: grid;
  grid-template-columns: 2fr 1fr;
  border-radius: 2rem;
  background-color: #fafafa;
  padding: 1.5rem;
  border: 1px solid #c0c0c0;
}

.gray {
  color: #808080;
}

.grayIcon {
  filter: invert(57%) sepia(0%) saturate(352%) hue-rotate(150deg) brightness(88%) contrast(88%);
}
.title-container {
  display: flex;
  margin-right: 20px;
}

.button {
  display: inline-block;
  font-size: 1rem;
  font-weight: 600;
  border: 0;
  background: none;
  color: #1e6bc6;
  margin-left: auto;
}

.button:hover {
  color: #2487ff;
  cursor: pointer;
}

.item-info {
  margin-left: 1.5rem;
  flex-wrap: nowrap;
}

.big-title {
  font-family: Graphik;
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 !important;

  line-height: normal;
}

.small-title {
  font-weight: 300;
  font-size: 1rem;
  margin: 0 !important;
  line-height: normal;
}
</style>
