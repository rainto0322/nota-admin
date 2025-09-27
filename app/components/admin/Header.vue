<template>
    <div class="min-w-60 flex flex-col p-4 italic">
        <nuxt-link class="rounded-4 p-4 my-1" v-for="item in NotaMenu" :to="`/admin${item.path}`">
            <icon class="m-r-2 v-middle" size="22" :name=item.icon />
            <span class="">
                {{ item.name }}
            </span>
        </nuxt-link>

        <span class="rounded-4 p-4 my-1 text-done cursor-pointer " @click="logout">
            <icon class="m-r-2 v-middle" name="tabler:logout-2" size="22" />
            <span>
                Logout
            </span>
        </span>
    </div>
</template>

<script lang="ts" setup>
const logout = () => {
    useToken.remove()
    useCue().done({ title: 'Logout successful.' })
    useRouter().push({ path: '/' })
}
</script>

<style scoped>
.router-link-active {
    background-color: var(--blur);
    color: var(--error);
}
</style>
