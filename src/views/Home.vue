<script setup>
import { ref, onMounted } from "vue"
import exterior1 from "../assets/images/exterior-1.png"
import diningTable from "../assets/images/dining-table.png"
import { RouterLink } from "vue-router"

const hasLoaded = ref(false)

onMounted(() => {
  setTimeout(() => {
    hasLoaded.value = true
  }, 100)
})
</script>

<template>
  <div>
    <img
      :src="exterior1"
      alt="exterior"
      class="w-full max-h-40 sm:max-h-80 object-cover transition-all duration-1900 ease-in-out"
      :class="
        hasLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      "
    />

    <div class="py-4 sm:py-6">
      <p
        :class="
          hasLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        "
        class="py-8 sm:py-12 leading-relaxed tracking-wider font-mono px-4 text-sm sm:text-md pb text-justify transition-all duration-1000 ease-in-out bg-[#b1d8db] text-[#4A423C]"
      >
        Our beautiful self-converted Mobile Library is an off-grid haven. Set on
        a lake in beautiful Somerset surrounded by rolling countryside, it is
        situated halfway between the popular artisan market-towns of Frome and
        Bruton and a short drive from Longleat. Four solar panels power your
        stay, providing you with a wonderful slice of peaceful tranquility.
        <RouterLink
          class="hover:text-[#dffcfe] underline cursor-pointer"
          to="/gallery"
          >Take a tour</RouterLink
        >.
      </p>
    </div>
    <img
      :src="diningTable"
      alt="Dining table"
      class="w-full max-h-60 sm:max-h-120 object-cover transition-all duration-1900 ease-in-out"
      :class="
        hasLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      "
    />
  </div>
</template>
