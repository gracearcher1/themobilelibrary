<script setup>
import { ref, onMounted } from "vue";
import exteriorSunset from "../assets/images/exterior-sunset.png";
import interiorLounge from "../assets/images/interior-lounge.png";
import breakfastInBed from "../assets/images/breakfast-in-bed.png";

const hasLoaded = ref(false);

onMounted(() => {
  setTimeout(() => {
    hasLoaded.value = true;
  }, 100);
});
</script>

<template>
  <div class="p-6">
    <h1
      class="text-2xl sm:text-4xl font-bold font-serif pb-12 sm:pl-12 transition-all duration-1000 ease-in-out text-[#4A423C]"
      :class="
        hasLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      "
    >
      explore the mobile library
    </h1>
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-7xl">
      <div class="col-span-1 sm:col-span-2">
        <img
          :src="interiorLounge"
          alt="Interior lounge"
          class="w-full h-full rounded-4xl object-cover transition-all duration-1900 ease-in-out"
          :class="
            hasLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          "
        />
      </div>

      <div class="flex-col gap-6 justify-end hidden sm:flex">
        <img
          :src="exteriorSunset"
          alt="Exterior at sunset"
          class="w-full rounded-4xl transition-all duration-1500 ease-in-out delay-200"
          :class="
            hasLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          "
        />
        <img
          :src="breakfastInBed"
          alt="Breakfast in bed"
          class="w-full rounded-4xl transition-all duration-1500 ease-in-out delay-400"
          :class="
            hasLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          "
        />
      </div>
    </div>
  </div>
</template>
