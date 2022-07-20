<script setup lang="ts">
const props = defineProps<{
  snapshot: Object; // TODO: Create an interface
}>();

console.log(props.snapshot);
</script>

<template>
  <div class="history-record">
    <span class="history-info">
      <p class="name">{{ props.snapshot.firstname }}</p>
      <p class="date">{{ new Date(props.snapshot.date).toLocaleString() }}</p>
    </span>

    <span class="history-changes">
      <p v-if="!props.snapshot.edits">Ha creato il componente</p>
      <span v-else class="edits-container">
        <p v-for="edit in props.snapshot.edits" :v-key="edit.key">
          {{ edit.key }} => <span style="text-decoration: line-through">{{ edit.from }}</span>
          {{ edit.to }}
        </p>
      </span>
    </span>
  </div>
</template>

<style>
.history-record {
  border: 1px solid #d9d9d9;
  border-radius: 1rem;
  padding: 1.25rem;
}

.history-info {
  align-content: center;
}

.edits-container {
  margin-top: 1rem;
}
.edits-container > * {
  margin: 0;
}

.history-info > * {
  margin: 0;
  display: inline;
  line-height: normal;
}

.history-info > .name {
  font-weight: 500;
  font-size: 1.2rem;
  margin-bottom: 1rem;
}

.history-info > .date {
  font-weight: 400;
  font-size: 0.8rem;
  color: #5f5f5f;
  margin-left: 0.75rem;
}

.history-changes > * {
  margin-top: 1rem;
  margin-bottom: 0;
}

@media screen and (min-width: 350px) and (max-width: 600px) {
  .history-info {
    display: flex;
    flex-wrap: wrap;
    align-items: center;

  }

  .history-info > .name {
    margin-bottom: .5rem;
    margin-right: .5rem;
  }

  .history-info > .date {
    margin-left: 0;
  }
}
</style>
