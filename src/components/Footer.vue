<script setup lang="ts">
import { computed } from "vue"
import { RouterLink, useRoute, useRouter } from "vue-router"
import { logoutAdmin } from "@/lib/adminAuth"

const route = useRoute()
const router = useRouter()
const isAdmin = computed(() => !!route.meta.requiresAdmin)

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

async function handleExitAdmin() {
  await logoutAdmin()
  router.push("/")
}
</script>
<template>
  <div name="footer" class="py-4 sm:py-10">
    <nav
      class="py-6 sm:py-12 leading-relaxed tracking-wider font-mono px-4 transition-all duration-1000 ease-in-out bg-blue text-ink flex flex-col sm:flex-row gap-3 sm:gap-12 items-center justify-center"
    >
      <template v-if="isAdmin">
        <RouterLink
          v-if="route.path !== '/admin'"
          to="/admin"
          class="hover:text-accent-light transition-opacity text-sm sm:text-lg"
        >
          back to admin homepage
        </RouterLink>
        <button
          type="button"
          @click="handleExitAdmin"
          class="hover:text-accent-light transition-opacity text-sm sm:text-lg cursor-pointer"
        >
          log out & exit admin mode
        </button>
      </template>
      <template v-else>
        <RouterLink
          v-for="link in footerLinks"
          :key="link.to"
          :to="link.to"
          class="hover:text-accent-light transition-opacity text-sm sm:text-lg"
        >
          {{ link.label }}
        </RouterLink>
      </template>
    </nav>
  </div>
</template>
