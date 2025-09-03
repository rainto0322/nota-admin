<template>
  <input type="datetime-local" step="1" :value="InputDate" @input="onInput" />
</template>

<script setup lang="ts">
import dayjs from "dayjs";
const modelValue = defineModel<number>()

const ConvertDate = (params: number) => {
  return dayjs(params).format('YYYY-MM-DDTHH:mm:ss')
}

const FormatDate = (params: number) => {
  return Math.floor(params / 1000)
}


const InputDate = computed(() => {
  if (modelValue.value) {
    return ConvertDate(modelValue.value * 1000)
  }
})

onMounted(() => {
  if (!modelValue.value) {
    modelValue.value = FormatDate(Date.now())
  }
})

const onInput = (event: Event) => {
  const inputElement = event.target as HTMLInputElement
  const value = inputElement.value
  if (value) {
    modelValue.value = FormatDate(new Date(value).getTime())
  }
}

</script>