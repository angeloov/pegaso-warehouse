<script setup lang="ts">
import itemIcon from "@/assets/icons/item.svg";
import editIcon from "@/assets/icons/edit.svg";
import RemoveItems from "./RemoveItems.vue";
</script>

<template>
  <div class="overlay">
    <div class="window">
      <img :src="itemIcon" alt="Item" class="item-icon" />

      <main>
        <div class="top-part">
          <div class="item-info">
            <span class="name-info">
              <h1>L7805CV</h1>

              <button class="edit-button">
                <img :src="editIcon" alt="edit button" class="edit-button" />
              </button>
            </span>
            <p>AA000</p>
          </div>

          <div class="quantity-container">Disponibilità: 12</div>
        </div>

        <div class="central-part">
          <div class="detailed-info">
            <p>Posizione: Pegaso</p>
            <p>Nome progetto: nome</p>
            <p>Tags: nome</p>
          </div>

          <RemoveItems />
        </div>

        <div class="bottom-part">
          <h1>Cronologia modifiche</h1>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
main {
  width: 100%;
}

.overlay {
  position: absolute;
  background: #20202069;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.edit-button {
  margin-left: 8px;
}

.window {
  background: #f5f9f6;
  padding: 1.5rem;
  display: flex;
}
.item-icon {
  margin-top: 1rem;
  margin-bottom: auto;
  margin-right: 1.5rem;
}

.item-info > p,
h1 {
  margin: 0;
}

.top-part {
  display: flex;
  gap: 1.5rem;
}

.edit-button {
  margin-bottom: auto;
  background: none;
  border: 0;
  cursor: pointer;
}

.name-info > * {
  display: inline-block;
}

.detailed-info {
  margin: 3rem 0;
}
.detailed-info > p {
  margin: 0;
  font-weight: 500;
  font-size: 1rem;
}

.quantity-container {
  background: #3cc31a;
  padding: 0.5rem 1rem;
  color: #f5f9f6;
  font-weight: 500;
  border-radius: 1rem;

  margin: auto 0;
}

.central-part {
  display: flex;
  width: 100%;
}
</style>
