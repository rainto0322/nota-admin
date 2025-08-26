<template>
  <NuxtLayout>
    <div>
      <h1>{{ currentTime }}</h1>

      <h2>aklsjdklasjd</h2>
    </div>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import dayjs from "dayjs";
const currentTime = ref('')
currentTime.value = dayjs().format('MMMM DD, HH:mm A')

</script>

<style></style>