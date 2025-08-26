<template>
  <div class="context show" v-if="menuMode" :style="menuX + menuY">
    <div @click="goto">goto test</div>
    <div @click="logout">logout</div>
  </div>
</template>

<script lang="ts" setup>
const { menuMode, menuX, menuY } = useContext()
function goto() {
  useRouter().push('/admin/test')
}

const logout = () => {
  useLocal.remove()
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
  border-radius: 5px;
  font-size: 12px;
  padding: 10px;
  z-index: 20;
}
</style>