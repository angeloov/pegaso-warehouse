<template>
  <div class="history-record">
    <span class="history-info">
      <p class="name">Angelo</p>
      <p class="date">17 set 2021</p>
    </span>

    <span class="history-changes">
      <p>Cambiamenti</p>
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

.history-info > * {
  margin: 0;
  display: inline;
  line-height: normal;
}

.history-info > .name {
  font-weight: 500;
  font-size: 1.2rem;
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
</style>
