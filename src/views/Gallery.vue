<script setup>
import { ref, computed } from "vue"
import exterior1 from "../assets/images/exterior-1.png"
import exterior2 from "../assets/images/exterior-2.png"
import lounge1 from "../assets/images/lounge-1.png"
import lounge2 from "../assets/images/lounge-2.png"
import lounge3 from "../assets/images/lounge-3.png"
import lounge4 from "../assets/images/lounge-4.png"
import lounge5 from "../assets/images/lounge-5.png"
import kitchen1 from "../assets/images/kitchen-1.png"
import kitchen2 from "../assets/images/kitchen-2.png"
import kitchen3 from "../assets/images/kitchen-3.png"
import kitchen4 from "../assets/images/kitchen-4.png"
import kitchen5 from "../assets/images/kitchen-5.png"
import kitchen6 from "../assets/images/kitchen-6.png"
import kitchen7 from "../assets/images/kitchen-7.png"
import kitchen8 from "../assets/images/kitchen-8.png"
import dining1 from "../assets/images/dining-1.png"
import dining2 from "../assets/images/dining-2.png"
import dining3 from "../assets/images/dining-3.png"
import dining4 from "../assets/images/dining-4.png"
import bedroom1 from "../assets/images/bedroom-1.png"
import bedroom2 from "../assets/images/bedroom-2.png"
import bedroom3 from "../assets/images/bedroom-3.png"
import bedroom4 from "../assets/images/bedroom-4.png"
import bedroom5 from "../assets/images/bedroom-5.png"
import bedroom6 from "../assets/images/bedroom-6.png"

const loungeImages = [
  {
    src: lounge1,
    caption: "The cosy lounge room",
    room: "living room",
  },
  {
    src: lounge2,
    caption:
      "Look forward to curling up on the sofa with an evening cup of tea or hot chocolate.",
    room: "living room",
  },
  {
    src: lounge3,
    caption: "Cushions and throws to snuggle up with.",
    room: "living room",
  },
  {
    src: lounge4,
    caption:
      "The multiple roof windows are perfect for night-time star gazing.",
    room: "living room",
  },
  {
    src: lounge5,
    caption:
      "Evening lakeside views and central heating for any chilly nights.",
    room: "living room",
  },
]

const kitchenImages = [
  {
    src: kitchen2,
    caption:
      "Look forward to the evening and the warm atmosphere created by lamplight.",
    room: "full kitchen",
  },
  {
    src: kitchen1,
    caption:
      "Enjoy using the whistling kettle to make your morning cafetière coffee or pot of loose leaf tea.",
    room: "full kitchen",
  },

  {
    src: kitchen3,
    caption:
      "View of the living space through to the bathroom from the kitchen.",
    room: "full kitchen",
  },
  {
    src: kitchen4,
    caption: "A well equipped kitchen awaits!",
    room: "full kitchen",
  },
  {
    src: kitchen5,
    caption:
      "Loose leaf tea, coffee, hot chocolate and a selection of decaffeinated and herbal Clipper tea bags are provided for you to savour during your stay.",
    room: "full kitchen",
  },
  {
    src: kitchen6,
    caption: "View from the bedroom door.",
    room: "full kitchen",
  },
  {
    src: kitchen7,
    caption:
      "All guests can look forward to enjoying homemade gluten free granola, yoghurt and jam for breakfast during their stay.",
    room: "full kitchen",
  },
  {
    src: kitchen8,
    caption: "",
    room: "full kitchen",
  },
]

const diningImages = [
  {
    src: dining1,
    caption:
      "The dining table can be moved with ease, allowing you to enjoy supper with a view.",
    room: "dining area",
  },
  {
    src: dining2,
    caption:
      "The table easily extends with enough room to seat 5 people comfortably.",
    room: "dining area",
  },
  {
    src: dining3,
    caption: "Luxury dining in natural and stunning surroundings.",
    room: "dining area",
  },
  {
    src: dining4,
    caption: "Set up your evening meal by the open double doors.",
    room: "dining area",
  },
]

const bedroomImages = [
  {
    src: bedroom1,
    caption:
      "Two firm and two soft pillows alongside snug cushions and warm throws add to the cosy atmosphere of the bedroom.",
    room: "bedroom",
  },
  {
    src: bedroom2,
    caption:
      "Our standing tray table makes breakfast in bed a comfortable luxury.",
    room: "bedroom",
  },
  {
    src: bedroom3,
    caption: "",
    room: "bedroom",
  },
  {
    src: bedroom4,
    caption:
      "Get a good night's sleep in the double bedroom. A spacious wardrobe provides plenty of hanging space and there's a separate chest of large deep drawers. There are reading lights and a selection of books to choose from to cosy up with at night.",
    room: "bedroom",
  },
  {
    src: bedroom5,
    caption:
      "During the day, our purpose-built sliding bed allows for a snug, private space to sit and relax.",
    room: "bedroom",
  },
  {
    src: bedroom6,
    room: "bedroom",
  },
]

const exteriorImages = [
  {
    src: exterior1,
    caption: "",
    room: "exterior",
  },
  {
    src: exterior2,
    caption: "",
    room: "exterior",
  },
]

const images = ref([
  ...loungeImages,
  ...kitchenImages,
  ...diningImages,
  ...bedroomImages,
  ...exteriorImages,
])

const currentIndex = ref(0)
const isFullScreen = ref(false)

const nextImage = () => {
  currentIndex.value = (currentIndex.value + 1) % images.value.length
}

const prevImage = () => {
  currentIndex.value =
    (currentIndex.value - 1 + images.value.length) % images.value.length
}

const openFullScreen = () => {
  isFullScreen.value = true
}

const closeFullScreen = () => {
  isFullScreen.value = false
}

const goToRoom = (roomName) => {
  const index = images.value.findIndex((img) => img.room === roomName)
  if (index !== -1) {
    currentIndex.value = index
  }
}

// Swipe drags the photo 1:1 with the finger. On release it either finishes
// sliding to the next/previous image or springs back to center, then the
// track silently resets to its resting position once the slide animation ends.
const SWIPE_THRESHOLD = 50
const dragOffsetPx = ref(0)
const isAnimating = ref(false)
const pendingDirection = ref(null) // 'next' | 'prev' | null
let dragStartX = 0
let trackWidthPx = 0

const prevIndex = computed(
  () => (currentIndex.value - 1 + images.value.length) % images.value.length,
)
const nextIndex = computed(() => (currentIndex.value + 1) % images.value.length)

const handleTouchStart = (e) => {
  dragStartX = e.touches[0].clientX
  trackWidthPx = e.currentTarget.offsetWidth
  isAnimating.value = false
  dragOffsetPx.value = 0
}

const handleTouchMove = (e) => {
  dragOffsetPx.value = e.touches[0].clientX - dragStartX
}

const handleTouchEnd = () => {
  isAnimating.value = true
  if (dragOffsetPx.value <= -SWIPE_THRESHOLD) {
    pendingDirection.value = "next"
    dragOffsetPx.value = -trackWidthPx
  } else if (dragOffsetPx.value >= SWIPE_THRESHOLD) {
    pendingDirection.value = "prev"
    dragOffsetPx.value = trackWidthPx
  } else {
    pendingDirection.value = null
    dragOffsetPx.value = 0
  }
}

const handleTrackTransitionEnd = (e) => {
  if (e.propertyName !== "transform") return
  if (pendingDirection.value === "next") currentIndex.value = nextIndex.value
  else if (pendingDirection.value === "prev") currentIndex.value = prevIndex.value
  pendingDirection.value = null
  isAnimating.value = false
  dragOffsetPx.value = 0
}
</script>
<template>
  <div class="px-4 pb-4">
    <p
      class="text-2xl tracking-wider sm:text-4xl font-mono pb-6 sm:pl-12 text-title"
    >
      gallery
    </p>
    <p
      class="text-sm tracking-wider sm:text-md font-mono pb-10 sm:pl-12 text-muted"
    >
      browse the gallery below to explore the mobile library room by room, or
      learn everything there is to know about the space
      <RouterLink
        class="hover:text-accent-light underline cursor-pointer"
        to="/the-space"
        >here</RouterLink
      >.
    </p>

    <div class="relative max-w-4xl mx-auto">
      <div class="flex flex-wrap justify-center gap-6 sm:gap-12 mb-4">
        <button
          v-for="room in [
            'living room',
            'full kitchen',
            'dining area',
            'bedroom',
            'exterior',
          ]"
          :key="room"
          @click="goToRoom(room)"
          :class="[
            'font-mono text-body transition-all hover:opacity-100',
            images[currentIndex].room === room
              ? 'font-bold'
              : 'font-normal opacity-50',
          ]"
        >
          {{ room }}
        </button>
      </div>

      <figure class="relative overflow-hidden">
        <div
          class="flex"
          :class="{ 'transition-transform duration-300 ease-out': isAnimating }"
          :style="{ transform: `translateX(calc(-100% + ${dragOffsetPx}px))` }"
          @touchstart="handleTouchStart"
          @touchmove="handleTouchMove"
          @touchend="handleTouchEnd"
          @transitionend="handleTrackTransitionEnd"
        >
          <div class="w-full shrink-0">
            <img
              :src="images[prevIndex].src"
              :alt="images[prevIndex].caption"
              class="h-100 w-full sm:w-auto sm:h-140 mx-auto object-cover rounded-lg shadow-lg"
            />
          </div>
          <div class="w-full shrink-0">
            <img
              :src="images[currentIndex].src"
              :alt="images[currentIndex].caption"
              class="h-100 w-full sm:w-auto sm:h-140 mx-auto object-cover rounded-lg shadow-lg cursor-pointer"
              @click="openFullScreen"
            />
          </div>
          <div class="w-full shrink-0">
            <img
              :src="images[nextIndex].src"
              :alt="images[nextIndex].caption"
              class="h-100 w-full sm:w-auto sm:h-140 mx-auto object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>

        <figcaption
          v-if="images[currentIndex].caption"
          class="mt-4 text-center text-sm sm:text-base font-mono text-body opacity-70"
        >
          {{ images[currentIndex].caption }}
        </figcaption>
      </figure>

      <button
        @click="prevImage"
        class="absolute left-2 top-80 -translate-y-1/2 bg-accent-light/70 hover:bg-accent-light text-ink p-3 rounded-full shadow-lg transition-all"
        aria-label="Previous image"
      >
        ←
      </button>

      <button
        @click="nextImage"
        class="absolute right-2 top-80 -translate-y-1/2 bg-accent-light/70 hover:bg-accent-light text-ink p-3 rounded-full shadow-lg transition-all"
        aria-label="Next image"
      >
        →
      </button>

      <div class="flex justify-center gap-2 mt-6">
        <button
          v-for="(image, index) in images"
          :key="index"
          @click="currentIndex = index"
          :class="[
            'w-2 h-2 rounded-full transition-all',
            currentIndex === index ? 'bg-body w-6' : 'bg-body/30',
          ]"
          :aria-label="`Go to image ${index + 1}`"
        />
      </div>
    </div>

    <div
      v-if="isFullScreen"
      class="fixed inset-0 bg-black z-50 flex items-center justify-center"
      @click="closeFullScreen"
    >
      <button
        @click="closeFullScreen"
        class="absolute top-4 right-4 text-white text-4xl hover:opacity-70 transition-opacity z-10"
        aria-label="Close"
      >
        ×
      </button>

      <div class="relative max-w-7xl max-h-screen p-4 w-full overflow-hidden" @click.stop>
        <div
          class="flex"
          :class="{ 'transition-transform duration-300 ease-out': isAnimating }"
          :style="{ transform: `translateX(calc(-100% + ${dragOffsetPx}px))` }"
          @touchstart="handleTouchStart"
          @touchmove="handleTouchMove"
          @touchend="handleTouchEnd"
          @transitionend="handleTrackTransitionEnd"
        >
          <div class="w-full shrink-0 flex items-center justify-center">
            <img
              :src="images[prevIndex].src"
              :alt="images[prevIndex].caption"
              class="max-w-full max-h-[75vh] mx-auto object-contain"
            />
          </div>
          <div class="w-full shrink-0 flex items-center justify-center">
            <img
              :src="images[currentIndex].src"
              :alt="images[currentIndex].caption"
              class="max-w-full max-h-[75vh] mx-auto object-contain"
            />
          </div>
          <div class="w-full shrink-0 flex items-center justify-center">
            <img
              :src="images[nextIndex].src"
              :alt="images[nextIndex].caption"
              class="max-w-full max-h-[75vh] mx-auto object-contain"
            />
          </div>
        </div>

        <figcaption
          v-if="images[currentIndex].caption"
          class="mt-4 text-center text-sm sm:text-base font-mono text-white px-4"
        >
          {{ images[currentIndex].caption }}
        </figcaption>

        <button
          @click.stop="prevImage"
          class="absolute left-8 top-1/2 -translate-y-1/2 bg-accent-light/70 hover:bg-accent-light text-ink p-3 rounded-full shadow-lg transition-all"
          aria-label="Previous image"
        >
          ←
        </button>

        <button
          @click.stop="nextImage"
          class="absolute right-8 top-1/2 -translate-y-1/2 bg-accent-light/70 hover:bg-accent-light text-ink p-3 rounded-full shadow-lg transition-all"
          aria-label="Next image"
        >
          →
        </button>
      </div>
    </div>
  </div>
</template>
