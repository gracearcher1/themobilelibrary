<script setup lang="ts">
import { computed } from "vue"
import { RouterLink, useRoute } from "vue-router"

const route = useRoute()

const allFooterLinks = [
  { to: "/", label: "home" },
  { to: "/book", label: "book a stay" },
  { to: "/gallery", label: "gallery" },
  { to: "/the-space", label: "about the space" },
  {
    to: "/more-info",
    label: "more info",
  },
]

const footerLinks = computed(() => {
  return allFooterLinks.filter((link) => link.to !== route.path)
})
</script>
<template>
  <div name="footer" class="py-4 sm:py-10">
    <nav
      class="py-6 sm:py-12 leading-relaxed tracking-wider font-mono px-4 transition-all duration-1000 ease-in-out bg-blue text-ink flex flex-col sm:flex-row gap-3 sm:gap-12 items-center justify-center"
    >
      <RouterLink
        v-for="link in footerLinks"
        :key="link.to"
        :to="link.to"
        class="hover:text-accent-light transition-opacity text-sm sm:text-lg"
      >
        {{ link.label }}
      </RouterLink>
    </nav>
  </div>
</template>
