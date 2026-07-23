<script setup>
import { useRouter } from "vue-router"
import { RouterLink } from "vue-router"
import { logoutAdmin } from "@/lib/adminAuth"

const router = useRouter()

async function handleLogout() {
  await logoutAdmin()
  router.push("/admin/login")
}
</script>

<template>
  <div class="px-6 max-w-240">
    <div class="flex items-center justify-between sm:pl-12 pb-12 max-w-2xl">
      <p class="text-2xl tracking-wider sm:text-4xl font-mono text-title">admin</p>
      <button
        type="button"
        @click="handleLogout"
        class="text-xs font-mono tracking-wider text-muted hover:opacity-70 cursor-pointer"
      >
        log out
      </button>
    </div>

    <div class="sm:pl-12 flex flex-col gap-4 max-w-sm">
      <RouterLink
        to="/admin/calendar"
        class="block text-center text-ink font-mono py-3 px-6 rounded-md transition-colors duration-200 bg-accent-light hover:opacity-90"
      >
        calendar
      </RouterLink>
      <RouterLink
        to="/admin/manage-bookings"
        class="block text-center text-body font-mono py-3 px-6 rounded-md transition-colors duration-200 border-2 border-accent hover:bg-accent/20"
      >
        manage bookings
      </RouterLink>
    </div>
  </div>
</template>
