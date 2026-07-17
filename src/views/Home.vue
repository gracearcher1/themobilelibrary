<script setup lang="ts">
import { ref, onMounted } from "vue"
import exterior1 from "../assets/images/exterior-1.png"
import diningTable from "../assets/images/dining-table.png"
import { RouterLink } from "vue-router"
import Review from "@/components/Review.vue"
import ReviewCarousel from "@/components/ReviewCarousel.vue"

const hasLoaded = ref(false)

onMounted(() => {
  setTimeout(() => {
    hasLoaded.value = true
  }, 100)
})

const reviews = [
  {
    name: "Natalie",
    date: "Nov 2025",
    text: "Booked for a girls night getaway opting for a cosy night in instead of a wild night out. Arrived and met by the host who was lovely and friendly and showed us how everything worked. Communication was amazing. You can tell this is a much loved space with so much attention to detail with furnishings and decor. Was so lovely and warm and cosy and all beds super comfortable. Lovely breakfast provided as well which was a nice touch. Would definitely book again. Thank you so much",
  },
  {
    name: "Fern",
    date: "Oct 2025",
    text: "Our stay was absolutely fantastic! Our 3 and 5 year olds were super excited when they arrived! Very secluded but a short drive from Frome where there's plenty of lovely shops and restaurants. Very close to Longleat too. We will definitely comeback.",
  },
  {
    name: "Sarah",
    date: "Apr 2026",
    text: "Fantastic location and wonderful accommodation. Really loved how there was fresh milk, real coffee and home made granola! Really friendly welcome and good vibes. Highly recommend.",
  },
  {
    name: "Rachel",
    date: "May 2026",
    text: "The mobile library was amazing. We loved staying somewhere a bit quirky but also had everything we need. Serena and Adam were so friendly and I appreciated being shown how everything worked. Lovely location too. We will definitely be back!",
  },
  {
    name: "Malika",
    date: "Nov 2025",
    text: "We came for a weekend and fell in love with this home on wheels! The area is quiet and picturesque. The space was very cozy and had everything you need to feel right at home. Big thank you to the hosts",
  },
  {
    name: "Georgie",
    date: "May 2026",
    text: "We had a lovely stay for one night with our 2 young girls. They loved the accommodation and it was a great half way stop off from Newquay. Hosts were brilliant, thank you!",
  },
  {
    name: "Lisa",
    date: "Apr 2026",
    text: "If you want something a bit quirky but still very comfortable and incredibly peaceful then this is for you!",
  },
  {
    name: "Anna",
    date: "May 2026",
    text: "Such a lovely set up in a stunning setting. Perfect for my family to stay whilst visiting family & Longleat. We will absolutely be staying again. Fantastic hosts too!",
  },
]
</script>

<template>
  <div>
    <img
      :src="exterior1"
      alt="exterior"
      class="w-full max-h-40 sm:max-h-70 object-cover transition-all duration-1900 ease-in-out"
      :class="
        hasLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      "
    />

    <div class="py-4 sm:py-6">
      <p
        :class="
          hasLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        "
        class="p-8 sm:p-12 leading-relaxed text-md sm:text-lg text-justify transition-all duration-1000 ease-in-out bg-blue text-ink"
        style="font-family: &quot;Fraunces&quot;, serif"
      >
        Our beautiful self-converted Mobile Library is an off-grid haven. Set on
        a lake in beautiful Somerset surrounded by rolling countryside, it is
        situated halfway between the popular artisan market-towns of Frome and
        Bruton and a short drive from Longleat. Four solar panels power your
        stay, providing you with a wonderful slice of peaceful tranquility.
      </p>
    </div>
    <div class="relative">
      <RouterLink
        to="/gallery"
        class="peer z-10 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-mono tracking-wider text-sm sm:text-base text-ink bg-accent-light px-6 py-3 rounded-md shadow-lg hover:opacity-90 transition-opacity cursor-pointer whitespace-nowrap"
      >
        take a tour
      </RouterLink>
      <img
        :src="diningTable"
        alt="Dining table"
        class="w-full max-h-60 sm:max-h-100 object-cover peer-hover:blur-sm"
        style="
          transition:
            opacity 1.9s ease-in-out,
            transform 1.9s ease-in-out,
            filter 150ms ease-in-out;
        "
        :class="
          hasLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        "
      />
    </div>
    <ReviewCarousel :reviews="reviews" class="pt-8" />
  </div>
</template>
