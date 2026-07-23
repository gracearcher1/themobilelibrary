<script setup>
import { ref, onMounted, computed } from "vue"
import { RouterLink } from "vue-router"
import { useBookings } from "@/composables/useBookings"
import { useAvailability } from "@/composables/useAvailability"

const { bookings, fetchBookings, confirmBooking, rejectBooking } = useBookings()
const { fetchBlockedDates } = useAvailability()

const actioningId = ref(null)

onMounted(() => {
  fetchBookings()
})

const pendingBookings = computed(() => bookings.value.filter((b) => b.status === "pending"))
const decidedBookings = computed(() => bookings.value.filter((b) => b.status !== "pending"))

function rangesOverlap(a, b) {
  return a.from_date <= b.to_date && b.from_date <= a.to_date
}

function conflictsFor(booking) {
  return pendingBookings.value.filter((b) => b.id !== booking.id && rangesOverlap(booking, b))
}

const hasOverlappingPending = computed(() =>
  pendingBookings.value.some((booking) => conflictsFor(booking).length > 0),
)

const confirmTarget = ref(null) // { booking, conflicts } while the accept/decline dialog is open

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

function handleConfirmClick(booking) {
  confirmTarget.value = { booking, conflicts: conflictsFor(booking) }
}

async function handleConfirmDialogAccept() {
  const { booking, conflicts } = confirmTarget.value
  confirmTarget.value = null
  await handleConfirm(booking)
  for (const conflict of conflicts) {
    await handleReject(conflict)
  }
}
</script>

<template>
  <div
    class="px-6 max-w-240 mx-auto flex flex-col items-center text-center pt-12 sm:pt-20"
    style="font-family: 'Fraunces', serif"
  >
    <div class="relative w-full flex items-center justify-center pb-8">
      <RouterLink
        to="/admin"
        class="absolute left-0 text-2xl leading-none text-body hover:opacity-70 transition-opacity"
      >
        ‹
      </RouterLink>
      <p class="text-2xl tracking-wider sm:text-4xl font-mono text-title">
        manage bookings
      </p>
    </div>

    <div class="max-w-2xl w-full space-y-8 text-left">
      <div>
        <p class="text-sm font-semibold text-body mb-3">Pending</p>
        <div
          v-if="hasOverlappingPending"
          class="mb-3 p-4 rounded-md text-sm"
          style="background-color: var(--color-error-bg); color: var(--color-error)"
        >
          It looks like some of the current pending requests have dates that overlap - please
          confirm only one of these requests
        </div>
        <ul class="space-y-4">
          <li
            v-for="booking in pendingBookings"
            :key="booking.id"
            class="border-2 border-accent rounded-md p-4 text-sm text-body space-y-2"
          >
            <p class="font-semibold">{{ booking.name }} — {{ booking.email }}</p>
            <p v-if="booking.phone" class="text-muted">{{ booking.phone }}</p>
            <p>{{ booking.from_date }} → {{ booking.to_date }}</p>
            <p v-if="booking.message" class="text-muted">{{ booking.message }}</p>
            <div class="flex gap-3 pt-2">
              <button
                type="button"
                @click="handleConfirmClick(booking)"
                :disabled="actioningId === booking.id"
                class="text-ink cursor-pointer py-2 px-4 rounded-md disabled:opacity-50 bg-accent-light"
              >
                Confirm
              </button>
              <button
                type="button"
                @click="handleReject(booking)"
                :disabled="actioningId === booking.id"
                class="cursor-pointer py-2 px-4 rounded-md disabled:opacity-50 border-2 border-accent text-muted"
              >
                Reject
              </button>
            </div>
          </li>
          <li v-if="!pendingBookings.length" class="text-sm text-muted">
            No pending requests
          </li>
        </ul>
      </div>

      <div>
        <p class="text-sm font-semibold text-body mb-3">Confirmed / rejected</p>
        <ul class="space-y-2">
          <li
            v-for="booking in decidedBookings"
            :key="booking.id"
            class="text-sm text-muted border-b border-accent/50 pb-2"
          >
            {{ booking.name }} · {{ booking.from_date }} → {{ booking.to_date }} ·
            <span :class="booking.status === 'confirmed' ? 'text-body' : 'text-error'">
              {{ booking.status }}
            </span>
          </li>
          <li v-if="!decidedBookings.length" class="text-sm text-muted">
            None yet
          </li>
        </ul>
      </div>
    </div>

    <div
      v-if="confirmTarget"
      class="fixed inset-0 z-50 flex items-center justify-center p-6"
      style="background-color: rgba(0, 0, 0, 0.5)"
    >
      <div
        class="w-full max-w-sm rounded-md p-6 space-y-4 text-sm bg-page border-2 border-accent text-body"
      >
        <p v-if="confirmTarget.conflicts.length">
          Are you sure you would like to accept
          <span class="font-semibold">
            {{ confirmTarget.booking.name }} ({{ confirmTarget.booking.from_date }} →
            {{ confirmTarget.booking.to_date }})
          </span>
          and decline
          <span class="font-semibold">
            <template v-for="(conflict, index) in confirmTarget.conflicts" :key="conflict.id">
              <template v-if="index > 0">, </template
              >{{ conflict.name }} ({{ conflict.from_date }} → {{ conflict.to_date }})
            </template>
          </span>
          ? A confirmation email will be sent to you and to the guest.
        </p>
        <p v-else>
          Are you sure you want to confirm
          <span class="font-semibold">
            {{ confirmTarget.booking.name }}'s booking ({{ confirmTarget.booking.from_date }} →
            {{ confirmTarget.booking.to_date }})
          </span>
          ? A confirmation email will be sent to you and to the guest.
        </p>
        <div class="flex gap-3">
          <button
            type="button"
            @click="handleConfirmDialogAccept"
            class="flex-1 text-ink cursor-pointer py-2 px-4 rounded-md bg-accent-light"
          >
            Yes, confirm
          </button>
          <button
            type="button"
            @click="confirmTarget = null"
            class="flex-1 cursor-pointer py-2 px-4 rounded-md border-2 border-accent text-muted"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
