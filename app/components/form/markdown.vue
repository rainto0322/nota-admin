<template>
  <textarea class="text-sm" v-model="modelValue" spellcheck="false" rows="10"></textarea>
</template>

<script lang="ts" setup>
const modelValue = defineModel<string>()

</script>

<style scoped></style>