<script setup lang="ts">
import Header from "@/components/Header.vue";
import ItemPrintable from "@/components/ItemPrintable.vue";
</script>

<template>
  <div>
    <Header />

    <main class="main">
      <span class="title-container">
        <p>Ultimi articoli aggiunti al magazzino</p>
        <Button label="Stampa tutti i QRCode" class="printbtn" />
      </span>
      <ItemPrintable />

      <p>QRCode già stampati</p>
      <ItemPrintable isPrinted />
     
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
  font-size: 2rem;
  font-weight: 600;
  position: relative;
}
</style>
