<script setup lang="ts">
import menuIcon from "@/assets/icons/menu.svg";
import addIcon from "@/assets/icons/add.svg";
import { ref } from "vue";

const navRef = ref(null);

function openNav() {
  navRef.value.style.height = "100%";
}
function closeNav() {
  navRef.value.style.height = "0";
}
</script>

<template>
  <button v-if="!hideNav" @click="openNav" class="edit-menu">
    <img :src="menuIcon" alt="" />
  </button>
  

    <nav class="menu-nav" ref="navRef">
        <button v-if="!hideNav" @click="closeNav" class="edit-menu">
           <img :src="addIcon" alt="" />
        </button>
    </nav>
  
  
</template>

<style>

.close-button > img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(45deg);
  width: 3rem;
  height: 3rem;
  cursor: pointer;
}

.edit-menu {
  border: 0;
  display: none;
}

.menu-nav {
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgb(87, 87, 87);

  height: 0;
}

@media screen and (min-width: 350px) and (max-width: 600px) {
  .edit-menu {
    display: block;
    margin-right: 2rem;
    margin-left: auto;
    cursor: pointer;
  }
}
</style>
