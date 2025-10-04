<template>
    <div id="admin">
        <NuxtLoadingIndicator color="#95b1ac" />
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
        flex-direction: row;
        overflow: scroll;
    }

    .header.open {
        visibility: visible;
        opacity: 1;
    }
}
</style>
