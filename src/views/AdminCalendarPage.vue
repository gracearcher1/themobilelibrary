<script setup>
import { ref, onMounted } from "vue"
import { RouterLink } from "vue-router"
import Calendar from "@/components/Calendar.vue"
import { useAvailability } from "@/composables/useAvailability"

const { blockedDates, fetchBlockedDates, addBlock, removeBlock } =
  useAvailability()

const selectedRange = ref({ from: null, to: null })
const blockLabel = ref("")
const blockError = ref("")
const blocking = ref(false)

onMounted(() => {
  fetchBlockedDates()
})

async function handleAddBlock() {
  if (!selectedRange.value.from || !selectedRange.value.to) {
    blockError.value = "Select a start and end date on the calendar first."
    return
  }
  blocking.value = true
  blockError.value = ""
  try {
    await addBlock({
      from: selectedRange.value.from,
      to: selectedRange.value.to,
      label: blockLabel.value,
    })
    selectedRange.value = { from: null, to: null }
    blockLabel.value = ""
  } catch (err) {
    blockError.value = err.message
  } finally {
    blocking.value = false
  }
}

async function handleRemoveBlock(id) {
  await removeBlock(id)
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
        calendar
      </p>
    </div>

    <div class="max-w-2xl w-full space-y-6">
      <p class="text-sm text-muted">
        Click a start date, then an end date, to block that range (maintenance,
        personal use, etc). Already-booked or blocked dates can't be
        re-selected — hover or click a blocked date to see details.
      </p>

      <Calendar
        v-model="selectedRange"
        :disabled-ranges="blockedDates"
        interactive
        @remove-block="handleRemoveBlock"
      />

      <div
        v-if="blockError"
        class="p-4 rounded-md text-sm"
        style="
          background-color: var(--color-error-bg);
          color: var(--color-error);
        "
      >
        {{ blockError }}
      </div>

      <div class="flex flex-col sm:flex-row gap-4 items-center justify-center">
        <input
          v-model="blockLabel"
          type="text"
          placeholder="Make a note (optional, e.g. maintenance, AirBnb booking)"
          class="px-4 py-2 border-2 rounded-md focus:outline-none text-sm border-accent flex-1"
        />
        <button
          type="button"
          @click="handleAddBlock"
          :disabled="blocking"
          class="text-ink cursor-pointer py-2 px-6 rounded-md transition-colors duration-200 disabled:opacity-50 bg-accent-light whitespace-nowrap"
        >
          {{ blocking ? "Blocking..." : "Block these dates" }}
        </button>
      </div>
    </div>
  </div>
</template>
