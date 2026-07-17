<script setup>
import { ref, onMounted, computed } from "vue"
import { useRouter, RouterLink } from "vue-router"
import { logoutAdmin } from "@/lib/adminAuth"
import { useBookings } from "@/composables/useBookings"
import { useAvailability } from "@/composables/useAvailability"

const router = useRouter()
const { bookings, fetchBookings, confirmBooking, rejectBooking } = useBookings()
const { fetchBlockedDates } = useAvailability()

const actioningId = ref(null)

onMounted(() => {
  fetchBookings()
})

function handleLogout() {
  logoutAdmin()
  router.push("/admin/login")
}

const pendingBookings = computed(() => bookings.value.filter((b) => b.status === "pending"))
const decidedBookings = computed(() => bookings.value.filter((b) => b.status !== "pending"))

async function handleConfirm(booking) {
  actioningId.value = booking.id
  try {
    await confirmBooking(booking)
    await fetchBlockedDates()
  } finally {
    actioningId.value = null
  }
}

async function handleReject(booking) {
  actioningId.value = booking.id
  try {
    await rejectBooking(booking)
  } finally {
    actioningId.value = null
  }
}
</script>

<template>
  <div class="px-6 max-w-240">
    <div class="flex items-center justify-between sm:pl-12 pb-8 max-w-2xl">
      <div class="flex items-center gap-4">
        <RouterLink
          to="/admin"
          class="text-2xl leading-none text-body hover:opacity-70 transition-opacity"
        >
          ‹
        </RouterLink>
        <p class="text-2xl tracking-wider sm:text-4xl font-mono text-title">
          manage bookings
        </p>
      </div>
      <button
        type="button"
        @click="handleLogout"
        class="text-xs font-mono tracking-wider text-muted hover:opacity-70 cursor-pointer"
      >
        log out
      </button>
    </div>

    <div class="sm:pl-12 max-w-2xl space-y-8">
      <div>
        <p class="text-sm font-mono font-semibold text-body mb-3">pending</p>
        <ul class="space-y-4">
          <li
            v-for="booking in pendingBookings"
            :key="booking.id"
            class="border-2 border-accent rounded-md p-4 font-mono text-sm text-body space-y-2"
          >
            <p class="font-semibold">{{ booking.name }} — {{ booking.email }}</p>
            <p v-if="booking.phone" class="text-muted">{{ booking.phone }}</p>
            <p>{{ booking.from_date }} → {{ booking.to_date }}</p>
            <p v-if="booking.message" class="text-muted">{{ booking.message }}</p>
            <div class="flex gap-3 pt-2">
              <button
                type="button"
                @click="handleConfirm(booking)"
                :disabled="actioningId === booking.id"
                class="text-ink cursor-pointer py-2 px-4 rounded-md disabled:opacity-50 bg-accent-light"
              >
                confirm
              </button>
              <button
                type="button"
                @click="handleReject(booking)"
                :disabled="actioningId === booking.id"
                class="cursor-pointer py-2 px-4 rounded-md disabled:opacity-50 border-2 border-accent text-muted"
              >
                reject
              </button>
            </div>
          </li>
          <li v-if="!pendingBookings.length" class="text-sm font-mono text-muted">
            no pending requests
          </li>
        </ul>
      </div>

      <div>
        <p class="text-sm font-mono font-semibold text-body mb-3">confirmed / rejected</p>
        <ul class="space-y-2">
          <li
            v-for="booking in decidedBookings"
            :key="booking.id"
            class="text-sm font-mono text-muted border-b border-accent/50 pb-2"
          >
            {{ booking.name }} · {{ booking.from_date }} → {{ booking.to_date }} ·
            <span :class="booking.status === 'confirmed' ? 'text-body' : 'text-error'">
              {{ booking.status }}
            </span>
          </li>
          <li v-if="!decidedBookings.length" class="text-sm font-mono text-muted">
            none yet
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
