<template>
  <input type="datetime-local" step="1" :value="displayValue" @input="onInput" />
</template>

<script setup lang="ts">
const modelValue = defineModel<string>()

const FormatDate = (params: string) => {
  return params.split('.')[0]
}

const displayValue = computed(() => {
  return FormatDate(modelValue.value as string)
})

if (modelValue.value) {
  modelValue.value = FormatDate(modelValue.value)
}

onMounted(() => {
  if (!modelValue.value) {
    modelValue.value = FormatDate(new Date().toISOString())
  }
})

const onInput = (event: Event) => {
  const inputElement = event.target as HTMLInputElement
  modelValue.value = inputElement.value
}

</script>