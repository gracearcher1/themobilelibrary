<script setup lang="ts">
defineProps<{
  date: string
  name: string
}>()
</script>

<template>
  <div class="py-4 sm:py-6">
    <div class="bg-tan-panel text-ink">
      <div
        class="flex justify-end mb-4 text-xs sm:text-sm text-ink/70 font-mono"
      >
        <div class="text-right">
          <p class="font-semibold">{{ name }}</p>
          <p>{{ date }}</p>
        </div>
      </div>

      <div class="mb-4">
        <span
          class="text-6xl sm:text-7xl font-serif text-ink/40 leading-none"
          >"</span
        >
      </div>

      <div
        class="px-4 sm:px-8 leading-relaxed tracking-wider font-mono text-sm sm:text-md text-justify"
      >
        <slot></slot>
      </div>

      <div class="flex justify-end mt-4">
        <span
          class="text-6xl sm:text-7xl font-serif text-ink/40 leading-none"
          >"</span
        >
      </div>
    </div>
  </div>
</template>
