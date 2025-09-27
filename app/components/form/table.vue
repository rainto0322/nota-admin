<template>

  <div class="table">

    <div class="text-right">
      <button class="sticky right-0" @click="NewItem">
        Add new
      </button>
    </div>
    <table v-if="TableData && TableData.length" cellspacing="0">
      <!-- table header -->
      <thead>
        <tr>
          <template v-for="value in ListHeader">
            <th v-if="value !== '_id'">
              {{ value }}
            </th>
          </template>
          <th v-show="props.control">
            control
          </th>
        </tr>
      </thead>

      <!-- table body -->
      <tbody>
        <tr v-for="item, item_key in TableData" @click="SelectRow(item_key)"
          :class="{ 'active': selectRow === item_key }">
          <template v-for="(value, key) of item">
            <td v-if="String(key) !== '_id'">
              <div style="width: 100%; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;">
                <template v-if="String(key) === 'date'">
                  {{ dayjs(value).format('YYYY-MM-DD HH:mm') }}
                </template>
                <template v-else>
                  {{ value }}
                </template>
              </div>
            </td>
          </template>
          <th class="control" v-show="props.control">
            <span class="text-done pr-4" @click="GotoEdit(item._id)">Edit</span>
            <span class="text-error" @click="DeleteItem(item._id)">Delete</span>
          </th>
        </tr>
      </tbody>
    </table>
    <h1 class="text-center show" v-else-if="loading">
      <icon name="tabler:loader" />
    </h1>
    <h1 class="text-center text-gray show" v-else>
      <icon class="mr-2" size="30px" name="tabler:database-x" /> No data available
    </h1>
  </div>

</template>

<script lang="ts" setup>
import dayjs from "dayjs";
const props = defineProps({
  api: {
    type: String,
    required: true
  },
  current: {
    type: Number,
    default: 1
  },
  page_size: {
    default: 20,
    type: Number
  },
  control: {
    type: Boolean,
    default: true
  },
  header: {
    type: Array as () => string[] | null,
  },
})

const loading = ref(false)
const ListHeader = ref()
const TableData = ref()
const selectRow = ref()

const SelectRow = (index: number) => {
  selectRow.value = selectRow.value === index ? null : index
}

const GetList = async () => {
  loading.value = true
  const result = await useApi.get(`${props.api}/li/${props.current - 1}/${props.page_size}`).catch((err) => {
    loading.value = false
  })
  const data = result?.data
  if (data) {
    if (props.header) {
      ListHeader.value = props.header
      TableData.value = data.map((item: Record<string, any>) => {
        const newObj: Record<string, any> = {}
        props.header?.forEach((key) => {
          newObj[key] = item[key];
        })
        return newObj
      })
    } else {
      TableData.value = data
      ListHeader.value = Object.keys(data[0])
    }
  }
  loading.value = false
}
GetList()

const GotoEdit = (id: string) => {
  useRouter().push(`/admin/${props.api}/${id}`)
}

const NewItem = () => {
  useRouter().push(`/admin/${props.api}/`)
}

const DeleteItem = async (id: string) => {
  if (confirm("Are you sure to delete this item?")) {
    const resule = await useApi.delete(`${props.api}/${id}`).catch((err) => {
      TableData.value = []
    })
    if (resule?.ok) {
      await GetList()
    }
  }
}


</script>

<style scoped>
.table {
  width: 100%;
  max-width: 100%;
  overflow-x: scroll;
  font-size: 14px;
  min-height: 500px;
}

.table table {
  min-width: 100%;
}

.table tr {
  position: relative;
}

.table th,
.table td {
  min-width: 20px;
  max-width: 200px;
  text-align: left;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding: 10px 15px;
  margin: 0;
}

.table tr:nth-child(2n) {
  background-color: var(--blur);
}

.table tr.active .control {
  background: var(--blur);
  position: sticky;
  right: -20px;
}
</style>