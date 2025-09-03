<template>
  <div>
    <h1 style="letter-spacing: 5px;">{{ currentTime }}</h1>
  </div>
</template>

<script lang="ts" setup>
import dayjs from "dayjs";
const currentTime = ref('')
let timer = null
currentTime.value = dayjs().format('HH:mm:ss A')

function updateTime() {
  currentTime.value = dayjs().format('HH:mm:ss A')
}

// 组件挂载时启动定时器
onMounted(() => {
  updateTime() // 立即更新一次
  timer = setInterval(updateTime, 1000) // 每秒更新
})
</script>

<style></style>