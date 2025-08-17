<template>
    <button class="pointer-events-auto rounded-md px-3 py-2 text-[0.8125rem]/5 font-semibold">
        {{ label }}
        <slot />
    </button>
</template>

<script setup>
defineProps({
    label: String,
})
</script>

<style>
.pointer-events-auto {
    pointer-events: auto;
}

.rounded-md {
    border-radius: 0.375rem;
}

.px-3 {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
}

.py-2 {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
}

.text-\[0\.8125rem\]\/5 {
    font-size: 0.8125rem;
    line-height: 1.25rem;
}

.font-semibold {
    font-weight: 600;
}
</style>