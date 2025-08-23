<template>
  <span class="tgl-btn" :class="modelValue ? 'true' : ''"></span>
</template>

<script lang="ts" setup>
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
})

</script>

<style scoped>
.tgl-btn {
  width: 48px;
  height: 26px;
  border: 2px solid var(--text);
  border-radius: 22px;
  position: relative;
  cursor: pointer;
}

.tgl-btn::before {
  content: '';
  width: 22px;
  height: 22px;
  background-color: var(--text);
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 50%;
  transition: left .2s;
}

.tgl-btn.true::before {
  left: 22px;
}
</style>