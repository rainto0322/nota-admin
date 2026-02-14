<template>
    <div>
        <nuxt-layout>
            <NuxtPage />
        </nuxt-layout>
        <cue />
    </div>
</template>

<script lang="ts" setup>
useHead({
    link: [
        {
            rel: "icon",
            type: "image/png",
            sizes: "32x32",
            href: "/favicon.png",
        },
    ],
    title: "Nota",
});
</script>

<style>
@import "@/assets/css/base.css";
</style>
