<script setup>
import { ref } from "vue"
import emailjs from "@emailjs/browser"

const formData = ref({
  name: "",
  email: "",
  fromDate: "",
  toDate: "",
  message: "",
})

const isSubmitting = ref(false)
const submitStatus = ref("") // 'success' or 'error'

const handleSubmit = async (e) => {
  e.preventDefault()
  isSubmitting.value = true
  submitStatus.value = ""

  try {
    const templateParams = {
      name: formData.value.name,
      email: formData.value.email,
      from_date: formData.value.fromDate,
      to_date: formData.value.toDate,
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
    formData.value = {
      name: "",
      email: "",
      fromDate: "",
      toDate: "",
      message: "",
    }
  } catch (error) {
    console.error("EmailJS Error:", error)
    submitStatus.value = "error"
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="px-6 max-w-240">
    <p
      class="text-2xl tracking-wider sm:text-4xl font-mono pb-12 sm:pl-12 transition-all duration-1000 ease-in-out text-[#4A423C]"
    >
      book your stay
    </p>
    <p
      class="text-sm tracking-wider sm:text-md font-mono pb-12 sm:pl-12 transition-all duration-1000 ease-in-out text-[#85766B]"
    >
      To request your trip to the mobile library, please let us know your chosen
      dates using the form below and we will get back to you shortly. If you
      have any questions regarding the mobile library, feel free to ask below.
    </p>

    <form
      @submit="handleSubmit"
      class="rounded-lg sm:pl-10 space-y-6"
      style="border-color: #85766b"
    >
      <div
        v-if="submitStatus === 'success'"
        class="mb-6 p-4 rounded-md font-mono text-sm"
        style="background-color: #c5e5e7; color: #4a423c"
      >
        Thank you! Your booking request has been sent.
      </div>

      <div
        v-if="submitStatus === 'error'"
        class="mb-6 p-4 rounded-md font-mono text-sm"
        style="background-color: #ffebee; color: #c62828"
      >
        Something went wrong. Please try again.
      </div>
      <div>
        <label
          for="name"
          class="block text-sm tracking-wider font-mono font-semibold mb-2"
          style="color: #4a423c"
        >
          full name
        </label>
        <input
          v-model="formData.name"
          type="text"
          id="name"
          name="name"
          required
          class="sm:w-1/2 w-full px-4 py-2 border-2 rounded-md focus:outline-none font-mono"
          style="border-color: #c5e5e7"
          onfocus="
            this.style.borderColor = '#C5E5E7'
            this.style.boxShadow = '0 0 0 2px #C5E5E7'
          "
          onblur="
            this.style.borderColor = '#c5e5e7'
            this.style.boxShadow = 'none'
          "
        />
      </div>

      <div>
        <label
          for="email"
          class="block text-sm tracking-wider font-mono font-semibold mb-2"
          style="color: #4a423c"
        >
          email
        </label>
        <input
          v-model="formData.email"
          type="email"
          id="email"
          name="email"
          required
          class="w-full sm:w-1/2 px-4 py-2 border-2 rounded-md focus:outline-none font-mono"
          style="border-color: #c5e5e7"
          onfocus="
            this.style.borderColor = '#C5E5E7'
            this.style.boxShadow = '0 0 0 2px #C5E5E7'
          "
          onblur="
            this.style.borderColor = '#c5e5e7'
            this.style.boxShadow = 'none'
          "
        />
      </div>

      <div>
        <label
          class="block tracking-wider font-mono text-sm font-semibold mb-2"
          style="color: #4a423c"
        >
          dates
        </label>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              for="from-date"
              class="block text-xs mb-1 tracking-wider font-mono"
              style="color: #85766b"
            >
              from:
            </label>
            <input
              v-model="formData.fromDate"
              type="text"
              id="from-date"
              name="from-date"
              placeholder="dd/mm/yyyy"
              pattern="\d{2}/\d{2}/\d{4}"
              required
              class="w-full px-4 py-2 border-2 rounded-md focus:outline-none font-mono"
              style="border-color: #c5e5e7"
              onfocus="
                this.style.borderColor = '#C5E5E7'
                this.style.boxShadow = '0 0 0 2px #C5E5E7'
              "
              onblur="
                this.style.borderColor = '#c5e5e7'
                this.style.boxShadow = 'none'
              "
            />
          </div>
          <div>
            <label
              for="to-date"
              class="block text-xs mb-1 tracking-wider font-mono"
              style="color: #85766b"
            >
              to:
            </label>
            <input
              v-model="formData.toDate"
              type="text"
              id="to-date"
              name="to-date"
              placeholder="dd/mm/yyyy"
              pattern="\d{2}/\d{2}/\d{4}"
              required
              class="w-full px-4 py-2 border-2 rounded-md focus:outline-none font-mono"
              style="border-color: #c5e5e7"
              onfocus="
                this.style.borderColor = '#C5E5E7'
                this.style.boxShadow = '0 0 0 2px #C5E5E7'
              "
              onblur="
                this.style.borderColor = '#c5e5e7'
                this.style.boxShadow = 'none'
              "
            />
          </div>
        </div>
      </div>

      <div>
        <label
          for="message"
          class="block text-sm tracking-wider font-mono font-semibold mb-2"
          style="color: #4a423c"
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
          style="border-color: #c5e5e7"
          onfocus="
            this.style.borderColor = '#C5E5E7'
            this.style.boxShadow = '0 0 0 2px #C5E5E7'
          "
          onblur="
            this.style.borderColor = '#c5e5e7'
            this.style.boxShadow = 'none'
          "
        ></textarea>
      </div>

      <button
        type="submit"
        :disabled="isSubmitting"
        class="w-full text-[#4A423C] cursor-pointer font-mono py-3 px-6 rounded-md transition-colors duration-200 disabled:opacity-50"
        style="background-color: #dffcfe"
      >
        {{ isSubmitting ? "Sending..." : "send booking request" }}
      </button>
    </form>
  </div>
</template>
