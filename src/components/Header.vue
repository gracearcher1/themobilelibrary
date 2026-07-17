<script setup lang="ts">
import { ref, computed } from "vue"
import { RouterLink, useRoute } from "vue-router"

const route = useRoute()
const isMenuOpen = ref(false)

const allMenuItems = [
  { to: "/", label: "home" },
  { to: "/book", label: "book a stay" },
  { to: "/gallery", label: "gallery" },
  { to: "/the-space", label: "about the space" },
  { to: "/more-info", label: "more info" },
]

const menuItems = computed(() => {
  return allMenuItems.filter((item) => item.to !== route.path)
})
</script>
<template>
  <div
    class="flex justify-between items-center text-md sm:text-l tracking-wider text-body font-mono"
  >
    <router-link
      to="/"
      class="text-2xl sm:text-3xl text-tan ml-auto pr-4 sm:pr-6 hover:opacity-80 transition-opacity cursor-pointer"
    >
      the mobile library
    </router-link>

    <button
      @click="isMenuOpen = !isMenuOpen"
      class="flex flex-col gap-1.5 hover:opacity-70 transition-opacity cursor-pointer relative z-50"
      aria-label="Toggle menu"
    >
      <span
        class="w-8 h-0.5 bg-body transition-transform"
        :class="{ 'rotate-45 translate-y-2': isMenuOpen }"
      ></span>
      <span
        class="w-8 h-0.5 bg-body transition-opacity"
        :class="{ 'opacity-0': isMenuOpen }"
      ></span>
      <span
        class="w-8 h-0.5 bg-body transition-transform"
        :class="{ '-rotate-45 -translate-y-2': isMenuOpen }"
      ></span>
    </button>

    <nav
      v-show="isMenuOpen"
      class="fixed inset-0 bg-page/60 backdrop-blur-sm flex flex-col gap-6 items-center justify-center z-40"
    >
      <RouterLink
        v-for="item in menuItems"
        :key="item.to"
        :to="item.to"
        class="hover:text-accent-light text-2xl cursor-pointer"
        @click="isMenuOpen = false"
      >
        {{ item.label }}
      </RouterLink>
    </nav>
  </div>
</template>
