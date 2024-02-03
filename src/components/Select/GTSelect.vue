<script setup lang="ts">
    import { defineProps, defineEmits } from 'vue'

    const props = defineProps<{
        modelValue: string
        options: string[]
    }>()

    const emit = defineEmits<{
        (e: 'update:modelValue', value: string | number): void
    }>()

    function handleInput(event: Event) {
        const element = event.target as HTMLSelectElement
        if (element) {
            emit('update:modelValue', element.value)
        }
    }
</script>

<template>
    <select
        class="p-[1.125rem] w-full border-2 border-[#E1E1E1] rounded-md focus:outline-none focus:border-[#F09F47] focus:ring-1 focus:ring-[#F09F47]"
        :value="props.modelValue"
        @input="handleInput"
    >
        <option v-for="option in props.options" :key="option" :value="option.id">
            {{ option.name }}
        </option>
    </select>
</template>
