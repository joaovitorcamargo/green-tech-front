<script setup lang="ts">
    import { defineProps } from 'vue'
    defineProps<{
        label: string
    }>()
</script>

<template>
    <button class="rounded-md p-3 w-full">{{ label }}</button>
</template>

<style scoped>
    button {
        cursor: pointer;
    }
</style>
