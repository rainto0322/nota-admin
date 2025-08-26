<template>
  <div id="login">
    <slot />
  </div>
</template>

<script lang="ts" setup>

useHead({
  link: [
    {
      rel: 'icon', type: 'image/svg+xml', sizes: '32x32', href:
        '/favicon.svg'
    },
  ],
  title: "Nota",
})
</script>

<style></style>