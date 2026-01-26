<script setup lang="ts">
import { ref } from "vue";
import { RouterLink } from "vue-router";
const isMenuOpen = ref(false);
</script>

<template>
  <header>
    <div class="py-4 text-md sm:text-l tracking-wider font-mono text-[#85766B]">
      <button
        @click="isMenuOpen = !isMenuOpen"
        class="flex flex-col gap-1.5 justify-end pt-4 pr-4 sm:pt-12 sm:pr-12 ml-auto w-fit hover:opacity-70 transition-opacity cursor-pointer relative z-50"
        aria-label="Toggle menu"
      >
        <span
          class="w-8 h-0.5 bg-[#85766B] transition-transform"
          :class="{ 'rotate-45 translate-y-2': isMenuOpen }"
        ></span>
        <span
          class="w-8 h-0.5 bg-[#85766B] transition-opacity"
          :class="{ 'opacity-0': isMenuOpen }"
        ></span>
        <span
          class="w-8 h-0.5 bg-[#85766B] transition-transform"
          :class="{ '-rotate-45 -translate-y-2': isMenuOpen }"
        ></span>
      </button>

      <nav
        v-show="isMenuOpen"
        class="fixed inset-0 bg-white/60 backdrop-blur-sm flex flex-col gap-6 items-center justify-center z-40"
      >
        <RouterLink
          to="/"
          class="hover:text-[#bdd4d6] text-2xl cursor-pointer"
          @click="isMenuOpen = false"
          >home</RouterLink
        >
        <RouterLink
          to="/book"
          class="hover:text-[#bdd4d6] text-2xl cursor-pointer"
          @click="isMenuOpen = false"
          >book</RouterLink
        >
        <RouterLink
          to="/gallery"
          class="hover:text-[#bdd4d6] text-2xl cursor-pointer"
          @click="isMenuOpen = false"
          >gallery</RouterLink
        >
        <RouterLink
          to="/prices"
          class="hover:text-[#bdd4d6] text-2xl cursor-pointer"
          @click="isMenuOpen = false"
          >prices</RouterLink
        >
      </nav>
    </div>
  </header>

  <main>
    <router-view />
  </main>
</template>
