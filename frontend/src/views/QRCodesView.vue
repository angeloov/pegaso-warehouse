<script setup lang="ts">
import Header from "@/components/Header.vue";
import ItemPrintable from "@/components/ItemPrintable.vue";
import SearchResult from "@/components/SearchResult.vue";

import { reactive } from "vue";
import client from "@/utils/trpc";

import { useToast } from "primevue/usetoast";
const toast = useToast();

const state = reactive({
  itemsToPrint: [],
  itemsAlreadyPrinted: [],
});

(async () => {
  state.itemsToPrint = await client.query("getItemsToBePrinted", {
    wasAlreadyPrinted: false,
  });

  state.itemsAlreadyPrinted = await client.query("getItemsToBePrinted", {
    wasAlreadyPrinted: true,
  });

  console.log(state);
})();

const printMultipleQRCodes = async () => {
  toast.add({
    severity: "info",
    summary: "Info",
    detail: "Generando il PDF...",
    life: 3000,
  });

  const linkToPDF = await client.query("generatePDF", {
    itemIDs: state.itemsToPrint.slice(0, 6).map(item => item._id),
  });

  window.open(linkToPDF, "_blank").focus();
};
</script>

<template
  <div>
    <Header />
    <Toast />

    <main class="main">
      <span class="title-container">
        <h1>Ultimi articoli aggiunti al magazzino</h1>
        <Button label="Stampa tutti i QRCode" class="printbtn" @click="printMultipleQRCodes" />
      </span>

      <SearchResult
        showOnlyPrintButton
        :id="item._id"
        :itemName="item.name"
        v-for="item in state.itemsToPrint"
      />

      <h1>QRCodes già stampati</h1>
      <SearchResult
        showOnlyPrintButton
        :id="item._id"
        :itemName="item.name"
        v-for="item in state.itemsAlreadyPrinted"
      />
    </main>
  </div>
</template>

<style scoped>
.printbtn {
  margin: auto !important;
  margin-right: 0 !important;
}

.title-container {
  display: flex;
}

.main {
  margin: 0 3rem;
  font-family: Graphik;
  /* font-size: 2rem; */
  /* font-weight: 600; */
  position: relative;
}
</style>
