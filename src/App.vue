<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<template>
  <header>
    <div class="text-md sm:text-xl font-serif text-[#85766B]">
      <nav class="flex gap-4 justify-end pt-4 pr-4 sm:pt-12 sm:pr-12">
        <RouterLink to="/" class="hover:underline">home</RouterLink>
        <RouterLink to="/book" class="hover:underline">book a stay</RouterLink>
        <RouterLink to="/gallery" class="hover:underline">gallery</RouterLink>
      </nav>
    </div>
  </header>

  <main>
    <router-view />
  </main>
</template>
