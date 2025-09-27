<template>
  <nuxt-layout name="admin">
    <admin-clock />

    <div class="dashboard">
      <div v-for="item in DashMenu" @click="useRouter().push('/admin' + item.path)">
        <icon class="v-middle mr-2 text-done" size="22" :name="item.icon" />
        <span class="v-middle">
          {{ item.name }}
        </span>
        <icon class="ml-auto text-gray" name="tabler:arrow-back" />
      </div>
    </div>
  </nuxt-layout>
</template>

<script lang="ts" setup>
import path from 'path';

</script>

<style scoped>
.dashboard {
  display: grid;
  gap: 5px;
}

.dashboard>div {
  display: flex;
  border: 1px solid var(--done);
  border-radius: var(--radius);
  padding: 15px;
}

.dashboard>div {}
</style>