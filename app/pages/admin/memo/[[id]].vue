<template>
  <nuxt-layout name="admin">
    <form-upload v-model="form.img" />
    <form-datetime v-model="form.date" />
    <form-markdown v-model="form.text" />
    <div class="text-right">
      <button @click="submit">
        {{ loading ? "loading..." : "submit" }}
      </button>
    </div>
  </nuxt-layout>
</template>

<script lang="ts" setup>
const route = useRoute();
const router = useRouter();
const loading = ref(false)
const id = route.params.id || null;
const form = ref({
  img: [],
  text: '',
  date: '',
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
  loading.value = true
  id ? await UpdateMemo() : await CreateMemo()
  loading.value = false
}

const CreateMemo = async () => {
  await useApi.post('memo', form.value).then(() => { router.push('/admin') }).catch(() => { })
}

const UpdateMemo = async () => {
  await useApi.put(`memo/${id}`, form.value).then(() => { router.push('/admin') }).catch(() => { })
}

watch(() => form.value.img, async () => {
  if (id) await UpdateMemo();
}, { deep: true });

</script>

<style></style>