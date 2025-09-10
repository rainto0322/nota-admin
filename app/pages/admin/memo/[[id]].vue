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


const GetMemo = async () => {
  await useApi.get(`memo/${id}`).then((data) => {
    if (data.ok) {
      form.value = data.data
    }
  })
}

if (id) {
  await GetMemo()
}

const submit = async () => {
  if (form.value.text.length <= 5) return
  id ? await UpdateMemo() : await CreateMemo()
}

const CreateMemo = async () => {
  await useApi.post('memo', form.value).then(() => { }).catch(() => { })
}

const UpdateMemo = async () => {
  await useApi.put(`memo/${id}`, form.value).catch(() => { })
}



</script>

<style></style>