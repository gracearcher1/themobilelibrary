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

const images = ref([...loungeImages, ...kitchenImages, ...exteriorImages])

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
</script>

<template>
  <div class="pb-12">
    <div class="">
      <p
        class="text-2xl tracking-wider sm:text-4xl font-mono pb-6 sm:pl-12 transition-all duration-1000 ease-in-out text-[#4A423C]"
      >
        gallery
      </p>
      <p
        class="text-sm tracking-wider sm:text-md font-mono pb-10 sm:pl-12 transition-all duration-1000 ease-in-out text-[#85766B]"
      >
        browse the gallery, exploring the mobile library room by room.
      </p>

      <div class="relative max-w-4xl mx-auto pl-4">
        <div class="flex flex-wrap justify-center gap-6 sm:gap-12 mb-4">
          <button
            v-for="room in ['living room', 'full kitchen', 'exterior']"
            :key="room"
            @click="goToRoom(room)"
            :class="[
              'font-mono text-[#4A423C] transition-all hover:opacity-100',
              images[currentIndex].room === room
                ? 'font-bold'
                : 'font-normal opacity-50',
            ]"
          >
            {{ room }}
          </button>
        </div>

        <figure class="relative">
          <img
            :src="images[currentIndex].src"
            :alt="images[currentIndex].caption"
            class="w-full sm:w-auto h-auto sm:h-160 mx-auto object-cover rounded-lg shadow-lg cursor-pointer"
            @click="openFullScreen"
          />

          <figcaption
            v-if="images[currentIndex].caption"
            class="mt-4 text-center text-sm sm:text-base font-mono text-[#4A423C] opacity-70"
          >
            {{ images[currentIndex].caption }}
          </figcaption>
        </figure>

        <button
          @click="prevImage"
          class="absolute left-4 top-1/2 -translate-y-1/2 bg-white/60 hover:bg-white text-[#4A423C] p-3 rounded-full shadow-lg transition-all"
          aria-label="Previous image"
        >
          ←
        </button>

        <button
          @click="nextImage"
          class="absolute right-4 top-1/2 -translate-y-1/2 bg-white/60 hover:bg-white text-[#4A423C] p-3 rounded-full shadow-lg transition-all"
          aria-label="Next image"
        >
          →
        </button>

        <div class="flex justify-center gap-2 mt-6">
          <button
            v-for="index in images"
            :key="index"
            @click="currentIndex = index"
            :class="[
              'w-2 h-2 rounded-full transition-all',
              currentIndex === index ? 'bg-[#4A423C] w-6' : 'bg-[#4A423C]/30',
            ]"
            :aria-label="`Go to image ${index + 1}`"
          />
        </div>
      </div>
    </div>

    <div
      v-if="isFullScreen"
      class="fixed inset-0 bg-black/80 z-50 flex items-center justify-center"
      @click="closeFullScreen"
    >
      <button
        @click="closeFullScreen"
        class="absolute top-4 right-4 text-white text-4xl hover:opacity-70 transition-opacity z-10"
        aria-label="Close"
      >
        ×
      </button>

      <div class="relative max-w-7xl max-h-screen p-4 w-full" @click.stop>
        <img
          :src="images[currentIndex].src"
          :alt="images[currentIndex].caption"
          class="max-w-full max-h-[75vh] mx-auto object-contain"
        />

        <figcaption
          v-if="images[currentIndex].caption"
          class="mt-4 text-center text-sm sm:text-base font-mono text-white px-4"
        >
          {{ images[currentIndex].caption }}
        </figcaption>

        <button
          @click.stop="prevImage"
          class="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-[#4A423C] p-3 rounded-full shadow-lg transition-all"
          aria-label="Previous image"
        >
          ←
        </button>

        <button
          @click.stop="nextImage"
          class="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-[#4A423C] p-3 rounded-full shadow-lg transition-all"
          aria-label="Next image"
        >
          →
        </button>
      </div>
    </div>
  </div>
</template>
