<template>
  <nuxt-layout name="admin">
    <form-upload v-model="form.img" />
    <form-datetime v-model="form.date" />
    <form-markdown v-model="form.text" />
    <button @click="submit">tijiao</button>
  </nuxt-layout>
</template>

<script lang="ts" setup>
const route = useRoute();
const id = route.params.id || null;
const form = ref({
  img: [],
  text: '',
  date: 0,
})

const submit = () => {
  console.log(form.value);
}

</script>

<style></style>