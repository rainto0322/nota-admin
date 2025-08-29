<template>
    <div id="admin">
        <div class="menu-open-btn" @click="toggleMenu">
            <icon size="28" name="tabler:list" />
        </div>
        <admin-header class="header" :class="{ 'open': menuMode }" />
        <div class="p-4 show">
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
        width: 100vw;
        min-height: 100vh;
        overflow-x: hidden;
        overflow-y: auto;
        position: fixed;
        visibility: hidden;
        background-color: #1f1d30;
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
        padding: 10px;
        border-radius: 50%;
        line-height: 0;
        position: fixed;
        right: 1em;
        bottom: 1em;
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
