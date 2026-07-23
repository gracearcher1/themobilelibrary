<script setup>
import { ref, onMounted } from "vue"
import { RouterLink } from "vue-router"
import { useAvailability } from "@/composables/useAvailability"

const { settings, fetchSettings, updateSetting } = useAvailability()

const nightlyRatePounds = ref("")
const hasMinStay = ref(false)
const minStayNights = ref(2)
const saving = ref(false)
const saveError = ref("")
const saved = ref(false)

onMounted(async () => {
  await fetchSettings()
  nightlyRatePounds.value = (settings.value.nightly_rate_pence / 100).toFixed(2)
  hasMinStay.value = settings.value.min_stay_nights > 0
  if (settings.value.min_stay_nights > 0) {
    minStayNights.value = settings.value.min_stay_nights
  }
})

async function handleSave() {
  saving.value = true
  saveError.value = ""
  saved.value = false
  try {
    const pence = Math.round(parseFloat(nightlyRatePounds.value) * 100)
    await updateSetting("nightly_rate_pence", pence)
    await updateSetting("min_stay_nights", hasMinStay.value ? minStayNights.value : 0)
    saved.value = true
  } catch (err) {
    saveError.value = err.message
  } finally {
    saving.value = false
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
      <p class="text-2xl tracking-wider sm:text-4xl font-mono text-title">pricing</p>
    </div>

    <form @submit.prevent="handleSave" class="max-w-sm w-full space-y-6 text-left">
      <div
        v-if="saveError"
        class="p-4 rounded-md text-sm"
        style="background-color: var(--color-error-bg); color: var(--color-error)"
      >
        {{ saveError }}
      </div>
      <div
        v-if="saved"
        class="p-4 rounded-md text-sm"
        style="background-color: var(--color-accent); color: var(--color-ink)"
      >
        Pricing updated.
      </div>

      <div>
        <label class="block text-sm tracking-wider font-semibold mb-2 text-body">
          Nightly rate (£)
        </label>
        <input
          v-model="nightlyRatePounds"
          type="number"
          min="0"
          step="0.01"
          required
          class="w-full px-4 py-2 border-2 rounded-md focus:outline-none border-accent"
        />
      </div>

      <div class="space-y-3">
        <label class="flex items-center gap-2 text-sm text-body cursor-pointer">
          <input v-model="hasMinStay" type="checkbox" class="cursor-pointer" />
          Require a minimum stay
        </label>
        <div v-if="hasMinStay">
          <label class="block text-sm tracking-wider font-semibold mb-2 text-body">
            Minimum nights
          </label>
          <input
            v-model.number="minStayNights"
            type="number"
            min="1"
            step="1"
            required
            class="w-full px-4 py-2 border-2 rounded-md focus:outline-none border-accent"
          />
        </div>
        <p v-else class="text-sm text-muted">
          No minimum stay — guests can book any length of stay.
        </p>
      </div>

      <button
        type="submit"
        :disabled="saving"
        class="w-full text-ink cursor-pointer py-3 px-6 rounded-md transition-colors duration-200 bg-accent-light disabled:opacity-50"
      >
        {{ saving ? "Saving..." : "Save pricing" }}
      </button>
    </form>
  </div>
</template>
