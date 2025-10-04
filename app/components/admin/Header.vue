<template>
    <div class="min-w-60 flex flex-col p-4 italic">
        <nuxt-link class="menu-item" v-for="item in NotaMenu" :to="`/admin${item.path}`">
            <icon class="menu-icon" size="22" :name=item.icon />
            <span class="menu-name">
                {{ item.name }}
            </span>
        </nuxt-link>

        <span class="menu-item" @click="logout">
            <icon class="menu-icon" name="tabler:logout-2" size="22" />
            <span class="menu-name">
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
.menu-item {
    border-radius: 1rem;
    margin-block: .25rem;
    padding: 1rem;
    color: var(--done);
}

.menu-item.router-link-active {
    background-color: var(--blur);
    color: var(--error);
}

.menu-icon {
    margin-right: 10px;
    vertical-align: middle;
}

.menu-name {
    vertical-align: middle;
}

@media screen and (max-width: 768px) {
    .menu-icon {
        margin: 0;
        padding: 0;
    }

    .menu-name {
        display: none;
    }
}
</style>
