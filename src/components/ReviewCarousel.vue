<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue"

const props = defineProps<{
  reviews: Array<{ name: string; date: string; text: string }>
}>()

const FADE_INTERVAL_MS = 9000

const currentIndex = ref(0)
let intervalId = null

function startInterval() {
  if (props.reviews.length > 1 && !intervalId) {
    intervalId = setInterval(() => {
      currentIndex.value = (currentIndex.value + 1) % props.reviews.length
    }, FADE_INTERVAL_MS)
  }
}

function stopInterval() {
  if (intervalId) {
    clearInterval(intervalId)
    intervalId = null
  }
}

onMounted(startInterval)
onUnmounted(stopInterval)
</script>

<template>
  <div class="relative w-full" @mouseenter="stopInterval" @mouseleave="startInterval">
    <Transition name="fade" mode="out-in">
      <div
        :key="currentIndex"
        class="h-64 sm:h-72 flex flex-col justify-between py-6 sm:py-8 px-6 sm:px-10 bg-tan-panel text-ink overflow-hidden"
      >
        <span class="text-3xl sm:text-4xl font-serif text-ink/40 leading-none">"</span>

        <div
          class="px-2 sm:px-4 leading-relaxed text-xs sm:text-sm line-clamp-5"
          style="font-family: 'Fraunces', serif"
        >
          {{ reviews[currentIndex].text }}
        </div>

        <div class="flex justify-between items-end">
          <span class="text-3xl sm:text-4xl font-serif text-ink/40 leading-none">"</span>
          <div class="text-right text-xs text-ink/70 font-mono">
            <p class="font-semibold">{{ reviews[currentIndex].name }}</p>
            <p>{{ reviews[currentIndex].date }}</p>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.6s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
