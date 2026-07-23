<script setup>
import { ref, onMounted } from "vue"
import { useRouter, RouterLink } from "vue-router"
import { logoutAdmin } from "@/lib/adminAuth"
import Calendar from "@/components/Calendar.vue"
import { useAvailability } from "@/composables/useAvailability"

const router = useRouter()
const { blockedDates, fetchBlockedDates, addBlock, removeBlock } = useAvailability()

const selectedRange = ref({ from: null, to: null })
const blockLabel = ref("")
const blockError = ref("")
const blocking = ref(false)
const removingId = ref(null)

onMounted(() => {
  fetchBlockedDates()
})

async function handleLogout() {
  await logoutAdmin()
  router.push("/admin/login")
}

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
  removingId.value = id
  await removeBlock(id)
  removingId.value = null
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
        <p class="text-2xl tracking-wider sm:text-4xl font-mono text-title">calendar</p>
      </div>
      <button
        type="button"
        @click="handleLogout"
        class="text-xs font-mono tracking-wider text-muted hover:opacity-70 cursor-pointer"
      >
        log out
      </button>
    </div>

    <div class="sm:pl-12 max-w-2xl space-y-6">
      <p class="text-sm font-mono text-muted">
        click a start date, then an end date, to block that range (maintenance, personal
        use, etc). already-booked or blocked dates can't be re-selected.
      </p>

      <Calendar v-model="selectedRange" :disabled-ranges="blockedDates" />

      <div
        v-if="blockError"
        class="p-4 rounded-md font-mono text-sm"
        style="background-color: var(--color-error-bg); color: var(--color-error)"
      >
        {{ blockError }}
      </div>

      <div class="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <input
          v-model="blockLabel"
          type="text"
          placeholder="label (optional, e.g. maintenance)"
          class="px-4 py-2 border-2 rounded-md focus:outline-none font-mono text-sm border-accent flex-1"
        />
        <button
          type="button"
          @click="handleAddBlock"
          :disabled="blocking"
          class="text-ink cursor-pointer font-mono py-2 px-6 rounded-md transition-colors duration-200 disabled:opacity-50 bg-accent-light whitespace-nowrap"
        >
          {{ blocking ? "blocking..." : "block these dates" }}
        </button>
      </div>

      <div>
        <p class="text-sm font-mono font-semibold text-body mb-2">currently blocked</p>
        <ul class="space-y-2">
          <li
            v-for="block in blockedDates"
            :key="block.id"
            class="flex items-center justify-between text-sm font-mono text-muted border-b border-accent/50 pb-2"
          >
            <span>
              {{ block.from_date }} → {{ block.to_date }}
              <span class="text-xs">
                ({{ block.source === "booking" ? "booking" : block.label || "manual" }})
              </span>
            </span>
            <button
              v-if="block.source === 'manual'"
              type="button"
              @click="handleRemoveBlock(block.id)"
              :disabled="removingId === block.id"
              class="text-xs text-error hover:opacity-70 cursor-pointer disabled:opacity-50"
            >
              remove
            </button>
          </li>
          <li v-if="!blockedDates.length" class="text-sm font-mono text-muted">
            no dates blocked yet
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
