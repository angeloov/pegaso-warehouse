<script setup lang="ts">
import Header from "@/components/Header.vue";
import addComponentIcon from "@/assets/icons/add-item.svg";
import scanIcon from "@/assets/icons/scan.svg";
import ViewTag from "@/components/ViewTag.vue";
import QRReader from "@/components/QRReader.vue";
import PegasoID from "@/components/PegasoID.vue";
import client from "@/utils/trpc";

import { reactive } from "vue";

const state = reactive({
  qrReaderIsShown: false,
  itemInfoDialogIsShown: false,
  itemID: null,
  tags: [],
});

import router from "@/router";

import { useUserDataStore } from "@/stores/userData";
import ItemInfoDialog from "../components/ItemInfoDialog.vue";
const userData = useUserDataStore();

const getRandomEmoji = () => {
  const emojis = ["👋", "😀", "🥳", "🎉"];
  return emojis[Math.floor(Math.random() * emojis.length)];
};

const onScannedQRCode = itemID => {
  state.qrReaderIsShown = false;
  state.itemInfoDialogIsShown = true;
  state.itemID = itemID;
};

const onCloseItemInfoWindow = () => {
  state.itemInfoDialogIsShown = false;
  state.itemID = null;
};

(async () => {
  state.tags = await client.query("getAllTags");
})();
</script>

<template>
  <div>
    <QRReader
      :isShown="state.qrReaderIsShown"
      :key="state.qrReaderIsShown"
      @closeQRReader="() => (state.qrReaderIsShown = false)"
      @scannedQRCode="onScannedQRCode"
    />
    <ItemInfoDialog
      v-if="state.itemInfoDialogIsShown"
      :itemID="state.itemID"
      @closeItemInfoWindow="onCloseItemInfoWindow"
    />
    <Header />

    <main>
      <h1 class="welcome-title">Ciao, {{ userData.firstName }} {{ getRandomEmoji() }}</h1>

      <div class="button-container">
        <Button @click="() => router.push('/add')" type="button" class="primary-btn">
          <img alt="logo" :src="addComponentIcon" class="primary-btn-icon" />
          <span class="ml-3 font-bold text-xl">Aggiungi oggetto</span>
        </Button>

        <Button @click="() => (state.qrReaderIsShown = true)" type="button" class="primary-btn">
          <img alt="logo" :src="scanIcon" class="primary-btn-icon" />
          <span class="ml-3 font-bold text-xl">Scannerizza QRCode</span>
        </Button>
      </div>

      <div>
        <PegasoID />
      </div>

      <div class="objects-container">
        <h2>Oggetti in magazzino</h2>

        <span>
          <ViewTag v-for="tag in state.tags" :name="tag" />
        </span>
      </div>
    </main>
  </div>
</template>

<style scoped>
main {
  margin: 0 3rem;
  margin-top: 1rem;
}

.primary-btn-icon {
  width: 32px;
}

.welcome-title {
  font-weight: 600;
}
.primary-btn {
  border-radius: 1.25rem;
  display: flex;
  justify-content: center;
  flex-grow: 1;
}

.button-container {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  margin-bottom: 2rem;
}

.objects-container > span {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
.objects-container h2 {
  font-weight: 600;
  margin-bottom: 1rem;
}

@media screen and (min-width: 350px) and (max-width: 600px) {
  .button-container {
    flex-direction: column;
  }

  main {
    margin: 0 1rem;
  }
}
</style>
