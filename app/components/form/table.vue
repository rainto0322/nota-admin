<template>
  <div class="table-wrap">
    <div class="table-contain">
      <div>
        <table cellspacing="0">
          <!-- table header -->
          <thead>
            <tr>
              <template v-for="value in header">
                <th v-if="value !== '_id'">
                  {{ value }}
                </th>
              </template>

              <th v-show="EditFunc || DeleteFunc">
                control
              </th>
            </tr>
          </thead>

          <!-- table body -->
          <tbody>
            <tr v-for="item, item_key in body">
              <template v-for="value, key of item">
                <td v-if="String(key) !== '_id'">
                  <template v-if="String(key) === 'date'">
                    {{ dayjs(value).format('YYYY/MM/DD HH:mm') }}
                  </template>
                  <template v-else>
                    {{ value }}
                  </template>
                </td>
              </template>

              <th v-show="EditFunc || DeleteFunc">
                <span class="text-done pr-4" v-if="EditFunc" @click="EditFunc(item._id)">Edit</span>
                <span class="text-error" v-if="DeleteFunc" @click="DeleteFunc(item._id)">Delete</span>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import dayjs from "dayjs";
const modelValue = defineModel({ type: Array, required: true })
const props = defineProps({
  header: {
    type: Array as () => string[] | null,
  },
  EditFunc: {
    type: Function
  },
  DeleteFunc: {
    type: Function
  },
})

const header = ref()
const body = ref()

// 处理数据映射的函数
const processData = () => {
  if (props.header) {
    header.value = props.header
    body.value = modelValue.value.map((item: any) => {
      const newHead: Record<string, any> = {}
      props.header?.forEach((key) => {
        newHead[key] = item[key]
      })
      return newHead
    })
  } else {
    header.value = Object.keys((modelValue.value as any[])[0] || {})
    body.value = modelValue.value
  }
}

processData()

watch(modelValue, (newValue) => {
  if (newValue) {
    processData()
  }
}, { deep: true })

</script>

<style scoped>
.table-wrap {
  max-width: 100%;
  margin-block: 1em;
  overflow: hidden;
}

.table-contain {
  overflow-x: scroll;
}

.table-contain {
  width: 100%;
  font-size: 14px;
}

.table-contain table {
  min-width: 100%;
}


.table-contain tr {
  position: relative;
}

.table-contain th,
.table-contain td {
  min-width: 20px;
  max-width: 200px;
  text-align: left;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding: 10px 15px;
  margin: 0;
}

.table-contain thead tr,
.table-contain tr:nth-child(2n) {
  background-color: var(--blur);
}

.table-contain tr.active .control {
  background: var(--blur);
  position: sticky;
  right: -20px;
}
</style>