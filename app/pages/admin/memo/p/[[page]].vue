<template>
  <nuxt-layout name="admin">
    <table-cont v-if="memo">
      <table-head>
        <template v-for="item in table_head" :key="item">
          <th v-if="(item as any) !== '_id'">
            {{ item }}
          </th>
        </template>
      </table-head>
      <table-body>
        <tr v-for="item of memo">
          <template v-for="value, key in item" :key="key">
            <td v-if="(key as any) !== '_id'">
              <toggle-button v-if="typeof key === 'boolean'" />
              {{ value }}
            </td>
          </template>
        </tr>
      </table-body>
    </table-cont>
    <table-not-found v-if="!memo" />
  </nuxt-layout>
</template>

<script lang="ts" setup>
const route = useRoute()
const page = route.params.page || 1;
const memo = ref()
const table_head = ref()

if (page) {
  await useApi.get(`memo/li/${page as number - 1}/10`).then(({ ok, data }) => {
    if (ok) {
      memo.value = data
      table_head.value = Object.keys(data[0]);
    }
  }).catch(() => { })
}




</script>

<style scoped></style>