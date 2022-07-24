<script setup lang="ts">
import client from "@/utils/trpc";
import { reactive } from "vue";

const state = reactive({
  response: "",
});

(async () => {
  state.response = await client.query("getNextPegID");
})();
</script>

<template>
  <div class="pegasoid">
    <h3>Pegaso ID</h3>
    <p>{{ state.response }}</p>
  </div>
</template>

<style scoped>
.pegasoid {
  background: #e6e6e6;
  padding: 1rem;
  border-radius: 1rem;
}

.pegasoid > h3 {
  margin-top: 0;
  margin-bottom: 4px;
}

.pegasoid > p {
  margin-top: 4px;
  margin-bottom: 0;
}
</style>
