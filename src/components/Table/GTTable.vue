<template>
    <table class="border-collapse table-fixed w-full text-sm">
        <thead>
            <slot name="theader"></slot>
        </thead>
        <tbody class="bg-white dark:bg-slate-800">
            <slot name="tbody"></slot>
        </tbody>
    </table>
</template>
