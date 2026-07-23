<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
import { loginAsAdmin } from "@/lib/adminAuth"

const router = useRouter()
const email = ref("")
const password = ref("")
const error = ref("")
const loggingIn = ref(false)

async function handleLogin(e) {
  e.preventDefault()
  loggingIn.value = true
  error.value = ""
  const result = await loginAsAdmin(email.value, password.value)
  loggingIn.value = false
  if (result.success) {
    router.push("/admin")
  } else {
    error.value = result.message
  }
}
</script>

<template>
  <div class="px-6 max-w-240">
    <p class="text-2xl tracking-wider sm:text-4xl font-mono pb-12 sm:pl-12 text-title">
      admin login
    </p>

    <form @submit="handleLogin" class="sm:pl-12 space-y-6 max-w-sm">
      <div
        v-if="error"
        class="p-4 rounded-md font-mono text-sm"
        style="background-color: var(--color-error-bg); color: var(--color-error)"
      >
        {{ error }}
      </div>
      <div>
        <label class="block text-sm tracking-wider font-mono font-semibold mb-2 text-body">
          email
        </label>
        <input
          v-model="email"
          type="email"
          required
          autofocus
          class="w-full px-4 py-2 border-2 rounded-md focus:outline-none font-mono border-accent"
        />
      </div>
      <div>
        <label class="block text-sm tracking-wider font-mono font-semibold mb-2 text-body">
          password
        </label>
        <input
          v-model="password"
          type="password"
          required
          class="w-full px-4 py-2 border-2 rounded-md focus:outline-none font-mono border-accent"
        />
      </div>
      <button
        type="submit"
        :disabled="loggingIn"
        class="w-full text-ink cursor-pointer font-mono py-3 px-6 rounded-md transition-colors duration-200 bg-accent-light disabled:opacity-50"
      >
        {{ loggingIn ? "logging in..." : "log in" }}
      </button>
    </form>
  </div>
</template>
