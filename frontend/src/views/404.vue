<script setup lang="ts">
import NotFound from "@/assets/404.png";
import Header from "@/components/Header.vue";
</script>

<template>
  <div>
    <Header />
    <main>
      <div class="inner-container">
        <img :src="NotFound" class="img404" />
        <div class="container">
          <span>
            <h1 class="inline big-title">404</h1>
            <h3 class="inline small-title">Oops! c'è stato un problema</h3>
          </span>
          <h1 class="mid-title">La pagina che hai cercato non esiste</h1>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.img404 {
  margin-top: 2rem;
  width: 50%;
}
.img {
  margin-top: 2.5rem;
  margin-left: 2.5rem;
}

.div-class {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

main {
  display: grid;
  place-items: center;
  font-family: Graphik;
}

.big-title {
  font-family: Graphik;
  font-size: 3rem;
  position: relative;
}

.small-title {
  position: relative;
  margin-left: .75rem;
  color: dimgray;
  font-weight: 400;
  font-size: 1.15rem;
}

.mid-title {
  font-family: Graphik;
  font-size: 1.5rem;
  position: relative;
  font-weight: 500;
  margin-top: 0;
  line-height: normal;
}

.inner-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}
.container {
}

.inline {
  display: inline;
}
</style>
