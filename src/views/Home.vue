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
      class="text-2xl tracking-wider font-mono sm:text-4xl pb-12 transition-all duration-1000 ease-in-out text-[#4A423C]"
      :class="
        hasLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      "
    >
      the mobile library
    </h1>
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-7xl">
      <div class="col-span-1 sm:col-span-2">
        <img
          :src="interiorLounge"
          alt="Interior lounge"
          class="w-full h-full object-cover transition-all duration-1900 ease-in-out"
          :class="
            hasLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          "
        />
      </div>

      <div class="flex-col gap-6 justify-end hidden sm:flex">
        <img
          :src="exteriorSunset"
          alt="Exterior at sunset"
          class="w-full transition-all duration-1500 ease-in-out delay-200"
          :class="
            hasLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          "
        />
        <img
          :src="breakfastInBed"
          alt="Breakfast in bed"
          class="w-full transition-all duration-1500 ease-in-out delay-400"
          :class="
            hasLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          "
        />
      </div>
    </div>
    <div class="pt-10">
      <p
        class="py-12 leading-relaxed tracking-wider font-mono px-4 text-md pb text-justify transition-all duration-1000 ease-in-out bg-[#bad1d3] text-[#ffffff]"
      >
        Our beautiful self-converted Mobile Library is an off-grid haven. Set on
        a lake in beautiful Somerset surrounded by rolling countryside, it is
        situated halfway between the popular artisan market-towns of Frome and
        Bruton and a short drive from Longleat. Four solar panels power your
        stay, providing you with a wonderful slice of peaceful tranquility.
      </p>
    </div>
  </div>
</template>
