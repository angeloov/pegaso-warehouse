<script setup lang="ts">
import addIcon from "@/assets/icons/add.svg";
const emit = defineEmits(["closeQRReader"])

const props = defineProps<{
  isShown: boolean;
}>();

</script>

<template>
  <div class="container" :class="{ shown: props.isShown }">
    <button class="close-btn" @click="() => emit('closeQRReader')">
      <img :src="addIcon" alt="" class="close-btn-img" />
    </button>
    <p>QRReader</p>
  </div>
</template>

<style scoped>
.shown {
  display: block !important;
}

.container {
  display: none;
  position: absolute;
  background: #fafafa;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
}

.close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0;
  cursor: pointer;
  background: #e8e8e8;
  border-radius: 100px;
  border: 0;
  width: 3.5rem;
  height: 3.5rem;
  display: grid;
  place-items: center;
}

.close-btn-img {
  transform: rotate(45deg);
  width: 3rem;
  height: 3rem;
  margin: auto;
}
</style>
