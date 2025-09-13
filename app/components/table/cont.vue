<template>
  <div class="table-container text-sm">
    <table cellspacing="0">
      <slot />
    </table>
  </div>
</template>

<script lang="ts" setup>

</script>

<style>
.table-container {
  overflow-x: auto;
  margin: 20px 0;
}

table {
  min-width: 100%;
  width: auto;
}

table th,
table td {
  text-align: left;
  white-space: nowrap;
  padding: 10px 15px;
}

table tr:nth-child(2n) {
  background-color: var(--blur);
}
</style>