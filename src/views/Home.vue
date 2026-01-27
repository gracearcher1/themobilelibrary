<script setup>
import { ref, onMounted } from "vue"
import exteriorSunset from "../assets/images/exterior-sunset.png"
import diningTable from "../assets/images/dining-table.png"

const hasLoaded = ref(false)

onMounted(() => {
  setTimeout(() => {
    hasLoaded.value = true
  }, 100)
})
</script>

<template>
  <div class="p-4 sm:p-6">
    <p
      class="text-2xl tracking-wider font-mono sm:text-4xl pb-4 sm:pb-12 transition-all duration-1000 ease-in-out text-[#4A423C]"
      :class="
        hasLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      "
    >
      your retreat awaits
    </p>
    <img
      :src="exteriorSunset"
      alt="Dining table"
      class="w-full max-h-60 sm:max-h-120 object-cover transition-all duration-1900 ease-in-out"
      :class="
        hasLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      "
    />

    <div class="py-4 sm:py-10">
      <p
        :class="
          hasLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        "
        class="py-12 leading-relaxed tracking-wider font-mono px-4 text-sm sm:text-md pb text-justify transition-all duration-1000 ease-in-out bg-[#b1d8db] text-[#4A423C]"
      >
        Our beautiful self-converted Mobile Library is an off-grid haven. Set on
        a lake in beautiful Somerset surrounded by rolling countryside, it is
        situated halfway between the popular artisan market-towns of Frome and
        Bruton and a short drive from Longleat. Four solar panels power your
        stay, providing you with a wonderful slice of peaceful tranquility.
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
