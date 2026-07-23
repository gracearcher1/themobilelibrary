<script setup>
import { ref, computed, onMounted } from "vue"
import emailjs from "@emailjs/browser"
import Calendar from "@/components/Calendar.vue"
import { useAvailability } from "@/composables/useAvailability"
import { useBookings } from "@/composables/useBookings"

const formData = ref({
  name: "",
  email: "",
  phone: "",
  message: "",
})

const selectedRange = ref({ from: null, to: null })

const { blockedDates, settings, fetchBlockedDates, fetchSettings } =
  useAvailability()
const { submitRequest } = useBookings()

onMounted(() => {
  fetchBlockedDates()
  fetchSettings()
})

function formatDisplayDate(iso) {
  const [y, m, d] = iso.split("-")
  return `${d}/${m}/${y}`
}

const nights = computed(() => {
  if (!selectedRange.value.from || !selectedRange.value.to) return 0
  const from = new Date(selectedRange.value.from)
  const to = new Date(selectedRange.value.to)
  return Math.round((to - from) / (1000 * 60 * 60 * 24))
})

const guidePrice = computed(() => {
  if (!nights.value) return null
  return ((nights.value * settings.value.nightly_rate_pence) / 100).toFixed(2)
})

const minStayError = computed(() => {
  if (!nights.value) return ""
  if (nights.value < settings.value.min_stay_nights) {
    return `minimum stay is ${settings.value.min_stay_nights} nights`
  }
  return ""
})

const step = ref(1) // 1: dates, 2: personal info, 3: review & submit
const direction = ref("forward") // controls which way the step transition slides

const canProceedFromDates = computed(
  () =>
    !!selectedRange.value.from &&
    !!selectedRange.value.to &&
    !minStayError.value,
)
const canProceedFromDetails = computed(
  () =>
    !!formData.value.name && !!formData.value.email && !!formData.value.message,
)

function goNext() {
  direction.value = "forward"
  if (step.value === 1 && canProceedFromDates.value) step.value = 2
  else if (step.value === 2 && canProceedFromDetails.value) step.value = 3
}

function goBack() {
  direction.value = "back"
  step.value = Math.max(1, step.value - 1)
}

const stepTitle = computed(() => {
  if (step.value === 1) return "select your dates"
  if (step.value === 2) return "personal information"
  return "review booking details"
})

const isSubmitting = ref(false)
const submitStatus = ref("") // 'success' or 'error'
const submitError = ref("")

const handleSubmit = async (e) => {
  e.preventDefault()

  if (!selectedRange.value.from || !selectedRange.value.to) {
    submitStatus.value = "error"
    submitError.value =
      "Please select your check-in and check-out dates on the calendar."
    return
  }
  if (minStayError.value) {
    submitStatus.value = "error"
    submitError.value = minStayError.value
    return
  }
  if (!canProceedFromDetails.value) {
    submitStatus.value = "error"
    submitError.value = "Please fill in your name, email, and message."
    return
  }

  isSubmitting.value = true
  submitStatus.value = ""
  submitError.value = ""

  try {
    await submitRequest({
      name: formData.value.name,
      email: formData.value.email,
      phone: formData.value.phone,
      from: selectedRange.value.from,
      to: selectedRange.value.to,
      message: formData.value.message,
    })

    const templateParams = {
      name: formData.value.name,
      email: formData.value.email,
      from_date: formatDisplayDate(selectedRange.value.from),
      to_date: formatDisplayDate(selectedRange.value.to),
      message: formData.value.message,
    }

    // booking request email
    await emailjs.send(
      "service_h4y79la",
      "template_tnwnamu",
      templateParams,
      "A1sDS8PAjb-ZgIwwu",
    )

    //booking request summary email
    await emailjs.send(
      "service_h4y79la",
      "template_ymhq20q",
      templateParams,
      "A1sDS8PAjb-ZgIwwu",
    )

    submitStatus.value = "success"
    // Reset form
    formData.value = { name: "", email: "", phone: "", message: "" }
    selectedRange.value = { from: null, to: null }
    step.value = 1
    await fetchBlockedDates()
  } catch (error) {
    console.error("Booking request error:", error)
    submitStatus.value = "error"
    submitError.value = "Something went wrong. Please try again."
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="px-6 max-w-240 mx-auto flex flex-col items-center">
    <p
      class="w-full text-2xl tracking-wider sm:text-4xl font-mono pb-12 sm:pl-12 transition-all duration-1000 ease-in-out text-title"
    >
      book a stay
    </p>

    <form
      @submit="handleSubmit"
      class="rounded-lg space-y-6 w-full max-w-lg"
      style="border-color: var(--color-muted)"
    >
      <div
        v-if="submitStatus === 'success'"
        class="mb-6 p-4 rounded-md font-mono text-sm"
        style="background-color: var(--color-accent); color: var(--color-ink)"
      >
        Thank you! Your booking request has been sent.
      </div>

      <div
        v-if="submitStatus === 'error'"
        class="mb-6 p-4 rounded-md font-mono text-sm"
        style="background-color: var(--color-error-bg); color: var(--color-error)"
      >
        {{ submitError }}
      </div>

      <div v-if="submitStatus !== 'success'" class="relative text-center">
        <button
          v-if="step > 1"
          type="button"
          @click="goBack"
          aria-label="Back"
          class="absolute left-0 top-1/2 -translate-y-1/2 text-2xl leading-none text-body hover:opacity-70 transition-opacity cursor-pointer"
        >
          ‹
        </button>
        <p class="text-sm tracking-wider font-mono text-body">
          {{ stepTitle }}
        </p>
      </div>

      <Transition
        :name="direction === 'forward' ? 'slide-next' : 'slide-back'"
        mode="out-in"
      >
        <div v-if="step === 1" key="dates">
          <label
            class="block tracking-wider font-mono text-sm font-semibold mb-2"
            style="color: var(--color-body)"
          >
            dates
          </label>
          <div
            class="w-full p-4 border-2 rounded-md font-mono"
            style="border-color: var(--color-accent)"
          >
            <Calendar v-model="selectedRange" :disabled-ranges="blockedDates" />
          </div>
          <p
            v-if="nights"
            class="text-sm font-mono pt-3"
            style="color: var(--color-muted)"
          >
            {{ nights }} night{{ nights === 1 ? "" : "s" }}
            <span v-if="guidePrice"> · guide price £{{ guidePrice }}</span>
          </p>
          <p
            v-if="minStayError"
            class="text-sm font-mono pt-1"
            style="color: var(--color-error)"
          >
            {{ minStayError }}
          </p>

          <button
            type="button"
            @click="goNext"
            :disabled="!canProceedFromDates"
            class="mt-6 w-full text-ink cursor-pointer font-mono py-3 px-6 rounded-md transition-colors duration-200 disabled:opacity-50"
            style="background-color: var(--color-accent-light)"
          >
            next
          </button>
        </div>

        <div v-else-if="step === 2" key="details" class="space-y-6">
          <div>
            <label
              for="name"
              class="block text-sm tracking-wider font-mono font-semibold mb-2"
              style="color: var(--color-body)"
            >
              full name
            </label>
            <input
              v-model="formData.name"
              type="text"
              id="name"
              name="name"
              required
              class="w-full px-4 py-2 border-2 rounded-md focus:outline-none font-mono"
              style="border-color: var(--color-accent)"
              onfocus="
                this.style.borderColor = 'var(--color-accent)'
                this.style.boxShadow = '0 0 0 2px var(--color-accent)'
              "
              onblur="
                this.style.borderColor = 'var(--color-accent)'
                this.style.boxShadow = 'none'
              "
            />
          </div>

          <div>
            <label
              for="email"
              class="block text-sm tracking-wider font-mono font-semibold mb-2"
              style="color: var(--color-body)"
            >
              email
            </label>
            <input
              v-model="formData.email"
              type="email"
              id="email"
              name="email"
              required
              class="w-full px-4 py-2 border-2 rounded-md focus:outline-none font-mono"
              style="border-color: var(--color-accent)"
              onfocus="
                this.style.borderColor = 'var(--color-accent)'
                this.style.boxShadow = '0 0 0 2px var(--color-accent)'
              "
              onblur="
                this.style.borderColor = 'var(--color-accent)'
                this.style.boxShadow = 'none'
              "
            />
          </div>

          <div>
            <label
              for="phone"
              class="block text-sm tracking-wider font-mono font-semibold mb-2"
              style="color: var(--color-body)"
            >
              phone (optional)
            </label>
            <input
              v-model="formData.phone"
              type="tel"
              id="phone"
              name="phone"
              class="w-full px-4 py-2 border-2 rounded-md focus:outline-none font-mono"
              style="border-color: var(--color-accent)"
              onfocus="
                this.style.borderColor = 'var(--color-accent)'
                this.style.boxShadow = '0 0 0 2px var(--color-accent)'
              "
              onblur="
                this.style.borderColor = 'var(--color-accent)'
                this.style.boxShadow = 'none'
              "
            />
          </div>

          <div>
            <label
              for="message"
              class="block text-sm tracking-wider font-mono font-semibold mb-2"
              style="color: var(--color-body)"
            >
              message:
            </label>
            <textarea
              v-model="formData.message"
              id="message"
              name="message"
              rows="5"
              required
              class="w-full px-4 py-2 border-2 rounded-md focus:outline-none font-mono resize-none"
              style="border-color: var(--color-accent)"
              onfocus="
                this.style.borderColor = 'var(--color-accent)'
                this.style.boxShadow = '0 0 0 2px var(--color-accent)'
              "
              onblur="
                this.style.borderColor = 'var(--color-accent)'
                this.style.boxShadow = 'none'
              "
            ></textarea>
          </div>

          <button
            type="button"
            @click="goNext"
            :disabled="!canProceedFromDetails"
            class="w-full text-ink cursor-pointer font-mono py-3 px-6 rounded-md transition-colors duration-200 disabled:opacity-50"
            style="background-color: var(--color-accent-light)"
          >
            next
          </button>
        </div>

        <div v-else key="review" class="space-y-6">
          <div
            class="p-4 border-2 rounded-md font-mono text-sm space-y-1"
            style="border-color: var(--color-accent); color: var(--color-body)"
          >
            <p>
              <span style="color: var(--color-muted)">dates:</span>
              {{ selectedRange.from }} → {{ selectedRange.to }} ({{
                nights
              }}
              night{{ nights === 1 ? "" : "s"
              }}<span v-if="guidePrice">, guide price £{{ guidePrice }}</span
              >)
            </p>
            <p><span style="color: var(--color-muted)">name:</span> {{ formData.name }}</p>
            <p>
              <span style="color: var(--color-muted)">email:</span> {{ formData.email }}
            </p>
            <p v-if="formData.phone">
              <span style="color: var(--color-muted)">phone:</span> {{ formData.phone }}
            </p>
            <p>
              <span style="color: var(--color-muted)">message:</span>
              {{ formData.message }}
            </p>
          </div>

          <button
            type="submit"
            :disabled="isSubmitting"
            class="w-full text-ink cursor-pointer font-mono py-3 px-6 rounded-md transition-colors duration-200 disabled:opacity-50"
            style="background-color: var(--color-accent-light)"
          >
            {{ isSubmitting ? "submitting..." : "submit booking request" }}
          </button>
        </div>
      </Transition>
    </form>
  </div>
</template>

<style scoped>
.slide-next-enter-active,
.slide-next-leave-active,
.slide-back-enter-active,
.slide-back-leave-active {
  transition:
    opacity 0.25s ease,
    transform 0.25s ease;
}

.slide-next-enter-from {
  opacity: 0;
  transform: translateX(24px);
}
.slide-next-leave-to {
  opacity: 0;
  transform: translateX(-24px);
}

.slide-back-enter-from {
  opacity: 0;
  transform: translateX(-24px);
}
.slide-back-leave-to {
  opacity: 0;
  transform: translateX(24px);
}
</style>
