<script setup lang="ts">
import addIcon from "@/assets/icons/add.svg";
import QrScanner from "qr-scanner";
import { onMounted, ref } from "vue";

const emit = defineEmits(["closeQRReader", "scannedQRCode"]);

const props = defineProps<{
  isShown: boolean;
}>();

const videoRef = ref(null);
let scanner;

onMounted(() => {
  if (props.isShown) {
    scanner = new QrScanner(
      videoRef.value,
      function (result: any) {
        if (result != "Scanner error: No QR code found") {
          emit("scannedQRCode", result.data);
          scanner.stop();
        }
      },
      {
        maxScansPerSecond: 5,
        highlightScanRegion: true,
        highlightCodeOutline: true,
      }
    );

    scanner.start();
  }
});

const closeQRReader = () => {
  emit("closeQRReader");
  scanner.destroy();
};
</script>

<template>
  <div class="container" :class="{ shown: props.isShown }">
    <button class="close-btn" @click="closeQRReader">
      <img :src="addIcon" alt="" class="close-btn-img" />
    </button>
    <video src="" ref="videoRef" class="camera"></video>
  </div>
</template>

<style scoped>
.shown {
  display: flex !important;
  place-items: center;
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
  z-index: 1;
}

.close-btn-img {
  transform: rotate(45deg);
  width: 3rem;
  height: 3rem;
  margin: auto;
}
.camera {
  width: 100vw;
  height: 100vh;
}

#output {
  position: absolute;
  top: 0;
}
</style>
