<template>
    <div id="admin">
        <div class="menu-open-btn" @click="toggleMenu">
            <icon name="tabler-list" size="22"/>
        </div>
        <admin-header class="header" :class="{ 'open': menuMode }" />
        <div class="p-4 w-full show overflow-x-auto">
            <slot />
        </div>
    </div>
</template>

<script lang="ts" setup>
const { menuMode } = useStatus()
const toggleMenu = () => {
    menuMode.value = !menuMode.value
}
</script>

<style scoped>
@media screen and (min-width: 1280px) {
    #admin {
        max-width: 2000px;
        margin: 0 auto;
        display: flex;
        flex-direction: row;
    }
}

@media screen and (min-width: 768px) and (max-width: 1280px) {
    .header {
        display: flex;
        flex-direction: row;
    }
}

@media screen and (max-width: 768px) {
    .header {
        min-height: 100vh;
        overflow-x: hidden;
        overflow-y: auto;
        position: fixed;
        visibility: hidden;
        background-color: var(--blur);
        backdrop-filter: blur(5px);
        z-index: 10;
        opacity: 0;
        transition: all .2s;
        flex-direction: column-reverse;
        padding-bottom: 100px;
    }

    .header.open {
        visibility: visible;
        opacity: 1;
    }

    .menu-open-btn {
        display: block;
        min-width: 42px;
        min-height: 42px;
        padding: 10px;
        border-radius: 10px;
        line-height: 0;
        position: fixed;
        right: 2em;
        bottom: 3em;
        background-color: var(--blur);
        color: var(--warn);
        z-index: 25;
    }
}

@media screen and (min-width: 768px) {
    .menu-open-btn {
        display: none;
    }
}
</style>
