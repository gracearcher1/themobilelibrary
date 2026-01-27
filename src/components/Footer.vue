<script setup lang="ts">
import { RouterLink } from "vue-router"

const footerLinks = [
  { to: "/book", label: "book your stay" },
  { to: "/gallery", label: "view gallery" },
  { to: "/more-info", label: "more info" },
  { to: "/", label: "home" },
]
</script>
<template>
  <div name="footer" class="py-4 sm:py-10">
    <nav
      class="py-6 sm:py-12 leading-relaxed tracking-wider font-mono px-4 transition-all duration-1000 ease-in-out bg-[#b1d8db] text-[#4A423C] flex flex-col sm:flex-row gap-3 sm:gap-12 items-center justify-center"
    >
      <RouterLink
        v-for="link in footerLinks"
        :key="link.to"
        :to="link.to"
        class="hover:text-[#dffcfe] transition-opacity text-sm sm:text-lg"
      >
        {{ link.label }}
      </RouterLink>
    </nav>
  </div>
</template>
