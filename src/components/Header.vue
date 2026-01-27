<script setup lang="ts">
import { ref } from "vue"
import { RouterLink } from "vue-router"

const isMenuOpen = ref(false)

const menuItems = [
  { to: "/", label: "home" },
  { to: "/book", label: "book your stay" },
  { to: "/gallery", label: "view our gallery" },
  { to: "/more-info", label: "more info" },
]
</script>
<template>
  <div
    class="flex justify-between items-center text-md sm:text-l tracking-wider text-[#4A423C] font-mono"
  >
    <router-link
      to="/"
      class="text-2xl sm:text-3xl ml-auto pr-4 sm:pr-6 text-[#d6b4ab] hover:opacity-80 transition-opacity cursor-pointer"
    >
      the mobile library
    </router-link>

    <button
      @click="isMenuOpen = !isMenuOpen"
      class="flex flex-col gap-1.5 hover:opacity-70 transition-opacity cursor-pointer relative z-50"
      aria-label="Toggle menu"
    >
      <span
        class="w-8 h-0.5 bg-[#4A423C] transition-transform"
        :class="{ 'rotate-45 translate-y-2': isMenuOpen }"
      ></span>
      <span
        class="w-8 h-0.5 bg-[#4A423C] transition-opacity"
        :class="{ 'opacity-0': isMenuOpen }"
      ></span>
      <span
        class="w-8 h-0.5 bg-[#4A423C] transition-transform"
        :class="{ '-rotate-45 -translate-y-2': isMenuOpen }"
      ></span>
    </button>

    <nav
      v-show="isMenuOpen"
      class="fixed inset-0 bg-white/50 backdrop-blur-sm flex flex-col gap-6 items-center justify-center z-40"
    >
      <RouterLink
        v-for="item in menuItems"
        :key="item.to"
        :to="item.to"
        class="hover:text-[#dffcfe] text-2xl cursor-pointer"
        @click="isMenuOpen = false"
      >
        {{ item.label }}
      </RouterLink>
    </nav>
  </div>
</template>
