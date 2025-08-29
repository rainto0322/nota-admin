<template>
  <div class="context show" v-if="menuMode" :style="menuX + menuY">
    <div class="context-item" @click="goto">goto test</div>
    <div class="context-item" @click="logout">logout</div>
  </div>
</template>

<script lang="ts" setup>
const { menuMode, menuX, menuY } = useContext()
function goto() {
  useRouter().push('/admin/test')
}

const logout = () => {
  useToken.remove()
  useCue().done({ title: 'Logout successful.' })
  useRouter().push({ path: '/' })
}
</script>

<style droped>
.context {
  position: absolute;
  min-width: 200px;
  border: 2px solid var(--done);
  background-color: var(--base);
  border-radius: var(--radius);
  font-size: 14px;
  z-index: 20;
  overflow: hidden;
}

.context-item {
  padding: 8px 10px;
  transition: all .2s;
}

.context-item:hover {
  background-color: var(--done);
  color: var(--base);
}
</style>