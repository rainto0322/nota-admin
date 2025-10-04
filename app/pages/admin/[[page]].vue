<template>
  <nuxt-layout name="admin">
    <div class="text-right">
      <button class="ml-auto" @click="router.push('/admin/memo')">+ Add memo</button>
    </div>
    <form-table v-model="data" :EditFunc="EditMemo" :DeleteFunc="DeleteMemo" />
    <div class="w-auto">
      <form-table-pag :current="current" :max="max" prefix="/admin" :showEllipsis="false" />
    </div>
  </nuxt-layout>
</template>

<script lang="ts" setup>
const page = Number(useRoute().params.page) || 1
const router = useRouter()
const data = ref()
const current = ref()
const max = ref()

const result: any = await useApi.get(`memo/li/${page - 1}/20`)
current.value = page
data.value = result.data
max.value = result.max


const EditMemo = async (id: string) => {
  router.push(`/admin/memo/${id}`)
}

const DeleteMemo = async (id: string) => {
  if (confirm("Are you sure to delete this item?")) {
    const result = await useApi.delete(`memo/${id}`).catch((err) => { })
    if (result?.ok) {
      data.value = data.value.filter((item: any) => item._id !== id)
    }
  }
}
</script>