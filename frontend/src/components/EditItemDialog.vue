<script setup lang="ts"></script>

<template>
  <div>
    <form action="">
      <div class="field">
        <label for="name" class="label">Nome oggetto</label>
        <InputText type="text" aria-describedby="name-input" />
      </div>

      <div class="field">
        <label for="quantity" class="label">Quantità</label>
        <InputText type="text" aria-describedby="quantity-input" />
      </div>

      <div class="field">
        <label for="position" class="label">Posizione</label>
        <InputText type="text" aria-describedby="position-input" />
      </div>

      <div class="field">
        <label for="tags" class="label">Tags</label>
        <InputText type="text" aria-describedby="tags-input" />
      </div>

      <div class="field">
        <label for="tags" class="label">Nome progetto</label>
        <InputText type="text" aria-describedby="project-name-input" />
      </div>

      <Button type="submit" label="Invia" />
    </form>
  </div>
</template>

<style scoped>
.label {
  display: block;
  color: #495057;
  font-size: 0.9rem;
}
</style>
