<script setup lang="ts">
import menuIcon from "@/assets/icons/menu.svg";
import addIcon from "@/assets/icons/add.svg";
import { ref } from "vue";
import { RouterLink } from "vue-router";

const navRef = ref(null);

function openNav() {
  navRef.value.style.height = "100%";
  // navRef.value.style.display = "block";
}
function closeNav() {
  navRef.value.style.height = "0";
  // navRef.value.style.display = "none";
}
</script>

<template>
  <button v-if="!hideNav" @click="openNav" class="edit-menu">
    <img :src="menuIcon" alt="" />
  </button>

  <nav class="menu-nav" ref="navRef">
    <button v-if="!hideNav" @click="closeNav" class="close-nav-btn">
      <img :src="addIcon" alt="" />
    </button>

    <div class="menu-content">
      <span>
        <RouterLink title="Home" class="header-link" to="/home">Home</RouterLink>
        <RouterLink title="Ricerca" class="header-link" to="/search">Ricerca</RouterLink>
        <RouterLink title="QRCodes" class="header-link" to="/qrcodes">QRCodes</RouterLink>
      </span>
    </div>
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
  height: 0;
  position: fixed;
  z-index: 1;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
  transition: 0.5s ease-in-out;
  background-color: #e6e6e6;
}

.close-nav-btn {
  display: block;
  margin: 1rem;
  padding: 2px;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 2rem;

  border: 0;
  margin-left: auto;
  cursor: pointer;
}

.close-nav-btn > img {
  transform: rotate(45deg);
  width: 2rem;
  height: 2rem;
}

.header-link {
  color: #101010;
  font-size: 2rem;
  font-weight: 500;
  text-decoration: none;
}

.menu-content {
  position: relative;
  top: 0;
  height: 100%;
  width: 100%;
  display: grid;
  place-items: center;
}
.menu-content > span {
  display: flex;
  flex-direction: column;
  margin-bottom: 2.5rem;
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
