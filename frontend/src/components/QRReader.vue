<script setup lang="ts">
import addIcon from "@/assets/icons/add.svg";
import QrScanner from "qr-scanner";
import { onMounted, ref } from "vue";

const emit = defineEmits(["closeQRReader", "scannedQRCode"]);

const props = defineProps<{
  isShown: boolean;
}>();

const videoRef = ref(null);
const camQrResult = ref(null);

onMounted(() => {
  console.log(videoRef.value);

  function setResult(label, result) {
    console.log(result.data);
    label.textContent = result.data;
  }

  const scanner = new QrScanner(
    videoRef.value,
    function (result) {
      setResult(camQrResult.value, result);
      if (result != "Scanner error: No QR code found") {
        console.log(result.data);
        emit("scannedQRCode", result.data);
      }
    },
    {
      onDecodeError: error => {
        if (camQrResult.value) {
          camQrResult.value.textContent = error;
        }
      },
      highlightScanRegion: true,
      highlightCodeOutline: true,
    }
  );

  scanner.start().then(() => {
    // updateFlashAvailability();
    // List cameras after the scanner started to avoid listCamera's stream and the scanner's stream being requested
    // at the same time which can result in listCamera's unconstrained stream also being offered to the scanner.
    // Note that we can also start the scanner after listCameras, we just have it this way around in the demo to
    // start the scanner earlier.
    QrScanner.listCameras(true).then(cameras =>
      cameras.forEach(camera => {
        const option = document.createElement("option");
        option.value = camera.id;
        option.text = camera.label;
      })
    );
  });
});
</script>

<template>
  <div class="container" :class="{ shown: props.isShown }">
    <button class="close-btn" @click="() => emit('closeQRReader')">
      <img :src="addIcon" alt="" class="close-btn-img" />
    </button>
    <video src="" ref="videoRef" class="camera"></video>
    <p id="output" ref="camQrResult">QRReader</p>
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
