<script setup lang="ts">
import { RouterLink } from "vue-router"
import Book from "./Book.vue"
</script>

<template>
  <p class="pl-4 text-2xl sm:text-4xl font-mono tracking-wider text-title">
    more info
  </p>
  <p
    class="px-6 text:md font-bold tracking-wider sm:text-lg font-mono pt-8 pb-4 text-body"
  >
    guest access
  </p>

  <p
    class="p-8 sm:py-12 leading-relaxed tracking-wider font-mono text-sm sm:text-md pb text-justify bg-blue-panel text-ink"
  >
    You'll have our beloved mobile library to yourselves. You will share the
    lake with the occasional fisherman and walkers will go by once or twice a
    day. Otherwise the surrounding space is yours to enjoy! We are lucky that
    there is no traffic noise as we are away from the road, just the occasional
    train going by on the other side of the field.
  </p>
  <p
    class="px-6 text:md font-bold tracking-wider sm:text-lg font-mono pt-8 pb-4 text-body"
  >
    other things to note
  </p>

  <p
    class="p-6 leading-relaxed tracking-wider font-mono text-sm sm:text-md pb text-justify text-body"
  >
    1. Water: There are 200 litres of fresh water provided onboard, including 40
    litres of hot water. As with any off grid living water is the most important
    resource, so we encourage you to conserve water. (To give you an idea, 40
    litres of hot water will give you a 6-8 minute shower). There is a gauge in
    the kitchen which allows you to see your water usage each day. If it does
    run low you can top it up quite easily using a food grade hose from a tap
    just outside.
  </p>
  <p
    class="p-6 leading-relaxed tracking-wider font-mono text-sm sm:text-md pb text-justify text-body"
  >
    2. Composting toilet: **Sit-down wee only!** When you open the toilet lid
    you will see that the toilet bowl has a separator, essentially there are two
    compartments in the toilet that automatically separate the liquid from the
    solids. When wiping a number two toilet paper can go into the toilet, when
    wiping urine please place this toilet paper in the bin provided. Keeping the
    urine and solids separate is what stops the toilet from smelling, as well as
    a few cupfuls of wood shavings on top! There is also a vinegar spray to keep
    things neutralised. Lastly, there is a small exhaust fan, which draws air
    down through the toilet and vents it outside through the floor of the
    bathroom. Apart from not flushing, it's not really any different from a
    normal toilet.
  </p>
  <p
    class="p-6 leading-relaxed tracking-wider font-mono text-sm sm:text-md pb text-justify text-body"
  >
    Being completely off-grid, the mobile library doesn't have any WiFi. We hope
    this will enable you to switch off, fully relax and enjoy the beautiful
    surroundings. Having said this, there is good phone signal and some 4G
    coverage depending on where you are in the bus!
  </p>
  <p
    class="p-6 leading-relaxed tracking-wider font-mono text-sm sm:text-md pb text-justify text-body"
  >
    If you have any questions that haven't been answered, please don't hesitate
    to get in touch using our request form
    <RouterLink class="hover:text-accent-light underline cursor-pointer" to="/book"
      >here</RouterLink
    >.
  </p>
</template>
