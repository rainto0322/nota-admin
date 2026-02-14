<template>
  <input type="datetime-local" step="1" :value="inputValue" @input="onInput" />
</template>

<script setup lang="ts">
import dayjs from "dayjs";
const modelValue = defineModel<number>()

const inputValue = computed(() => {
  return dayjs(modelValue.value).format('YYYY-MM-DDTHH:mm')
})

onMounted(() => {
  if (!modelValue.value) {
    modelValue.value = Date.now()
  }
})

const onInput = (event: Event) => {
  const inputElement = event.target as HTMLInputElement
  console.log(inputElement.value)
}

</script>