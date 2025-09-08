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

if (id) await GetMemo()

const GetMemo = async () => {
  await useApi.get(`memo/${id}`).then((data) => {
    if (data.ok) {
      console.log(data);

    }
  })
}


const submit = async () => {
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