<template>
  <div>
    <div class="pagination">
      <!-- prev page -->
      <span v-if="current !== 1" @click="goToPage(current - 1)">prev</span>

      <!-- first page -->
      <span v-if="current === 1" @click="goToPage(1)" :class="{ active: current === 1 }">1</span>

      <!-- preceded ellipsis -->
      <span v-if="showFrontEllipsis && showEllipsis" class="ellipsis">...</span>

      <!-- Middle page -->
      <span v-for="page in displayedPages" @click="goToPage(page)" :class="{ active: current === page }">
        {{ page }}
      </span>

      <!-- post ellipsis -->
      <span v-if="showBackEllipsis && showEllipsis" class="ellipsis">...</span>

      <!-- last page -->
      <span v-if="current === max" @click="goToPage(max)" :class="{ active: current === max }">
        {{ max }}
      </span>

      <!-- next page -->
      <span v-if="current !== max" @click="goToPage(current + 1)">next
      </span>

      <input class="jump" :max="max" min="1" type="number" v-model="inputValue" @keypress="handleKeyPress">
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  current: number;
  max: number;
  showEllipsis: boolean;
  prefix?: string;
}

const props = withDefaults(defineProps<Props>(), {
  prefix: '',
  showEllipsis: false
});

const inputValue = ref(props.current)
const showFrontEllipsis = computed(() => props.current > 3);
const showBackEllipsis = computed(() => props.current < props.max - 2);


const displayedPages = computed(() => {
  const { current, max } = props;
  const delta = 2;
  const range = [];

  for (let i = Math.max(2, current - delta); i <= Math.min(max - 1, current + delta); i++) {
    range.push(i);
  }

  return range;
});

const goToPage = (page: number) => {
  if (page < 1 || page > props.max || page === props.current) return;

  const router = useRouter();
  const path = page === 1 ? props.prefix : `${props.prefix}/${page}`;
  router.push(path);
};

const handleKeyPress = (event: any) => {
  const key = event.key

  if (key === 13 || key === 'Enter') {
    event.preventDefault();
    goToPage(inputValue.value)
  }
}

</script>

<style scoped>
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  gap: 0.5rem;
  margin: 2rem 0;
  flex-wrap: wrap;
}

.pagination span {
  padding: 5px 8px;
  background-color: var(--text);
  color: var(--base);
  border-radius: 5px;
  cursor: pointer;
}

.pagination span.active {
  background-color: var(--blur);
  color: var(--text);
}

.pagination span.ellipsis {
  background-color: transparent;
  color: var(--text);
}

input.jump::-webkit-outer-spin-button,
input.jump::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input.jump {
  -moz-appearance: textfield;
  width: 40px;
  padding: 8px 8px;
}
</style>