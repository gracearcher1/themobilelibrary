<script setup>
import { RouterLink } from "vue-router"
</script>

<template>
  <div
    class="px-6 max-w-240 mx-auto flex flex-col items-center text-center pt-12 sm:pt-20"
    style="font-family: 'Fraunces', serif"
  >
    <p class="text-2xl tracking-wider sm:text-4xl font-mono text-title pb-4">admin homepage</p>

    <p class="max-w-2xl pb-8 text-sm text-muted">
      Welcome to your admin space, where you can manage your bookings, block out dates, and
      alter pricing.
    </p>

    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl w-full">
      <RouterLink
        to="/admin/calendar"
        class="flex flex-col items-center justify-center gap-2 text-center text-body py-8 px-6 rounded-md transition-colors duration-200 border-2 border-accent hover:bg-accent/20"
      >
        <span class="text-3xl">📅</span>
        Calendar
      </RouterLink>
      <RouterLink
        to="/admin/manage-bookings"
        class="flex flex-col items-center justify-center gap-2 text-center text-body py-8 px-6 rounded-md transition-colors duration-200 border-2 border-accent hover:bg-accent/20"
      >
        <span class="text-3xl">📖</span>
        Manage bookings
      </RouterLink>
      <RouterLink
        to="/admin/pricing"
        class="flex flex-col items-center justify-center gap-2 text-center text-body py-8 px-6 rounded-md transition-colors duration-200 border-2 border-accent hover:bg-accent/20"
      >
        <span class="text-3xl">💷</span>
        Pricing
      </RouterLink>
    </div>
  </div>
</template>
