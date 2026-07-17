<script setup lang="ts">
import { RouterLink } from "vue-router"
import loungeImg from "../assets/images/lounge-1.png"
import kitchenImg from "../assets/images/kitchen-4.png"
import breakfastImg from "../assets/images/kitchen-7.png"
import bedroomImg from "../assets/images/bedroom-1.png"
</script>

<template>
  <p
    class="pl-4 text-2xl sm:text-4xl font-mono tracking-wider pb-12 transition-all duration-1000 ease-in-out text-title"
  >
    the space
  </p>

  <p class="pl-4 text-sm tracking-wider sm:text-md font-mono text-muted">
    *Please note the Mobile Library is now on its own hardstanding pitch at the
    entrance to the lake, allowing for year-round stays and easier access.*
  </p>
  <p
    class="px-6 text:md font-bold tracking-wider sm:text-lg font-mono pt-8 pb-4 text-body"
  >
    living area
  </p>
  <div
    class="p-8 sm:py-12 transition-all duration-1000 ease-in-out bg-blue-panel text-ink flex flex-col sm:flex-row gap-6 items-center"
  >
    <img
      :src="loungeImg"
      alt="The cosy lounge room"
      class="w-full sm:w-48 h-40 object-cover rounded-md shadow-md shrink-0"
    />
    <p class="leading-relaxed tracking-wider font-mono text-sm sm:text-md text-justify">
      An open and airy living area with a king size sofa bed furnished with
      cushions and throws makes an ideal place to relax and listen to the sounds
      of nature and while away the hours. An extendable dinning table provides
      versatility to this space, which faces on to two large doors which create a
      sense of indoor/outdoor living.
      <RouterLink
        class="hover:text-accent-light underline cursor-pointer"
        to="/gallery"
        >Take a look</RouterLink
      >.
    </p>
  </div>
  <p
    class="px-6 text:md font-bold tracking-wider sm:text-lg font-mono pt-8 pb-4 text-body"
  >
    kitchen
  </p>
  <div
    class="p-8 sm:py-12 transition-all duration-1000 ease-in-out bg-tan-panel text-ink flex flex-col sm:flex-row-reverse gap-6 items-center"
  >
    <img
      :src="kitchenImg"
      alt="A well equipped kitchen"
      class="w-full sm:w-48 h-40 object-cover rounded-md shadow-md shrink-0"
    />
    <p class="leading-relaxed tracking-wider font-mono text-sm sm:text-md text-justify">
      The centrepiece of the mobile library is the large fully equipped kitchen,
      which boasts a full size (275 litre) marine grade fridge and three drawer
      freezer, four burner gas stove with oven and separate grill, large stainless
      sink and mixer tap with hand spray facility, five large cupboards including
      generous corner cupboard with towered wheel for easy access. All cutlery,
      crockery, glasses, bowls, trays, chopping boards, utensils, etc. are
      provided. The two frying pans are carbon steel; please only wash these in
      hot water, the use of washing-up liquid damages the pans. Cooking oil,
      Maldon sea salt, black pepper, salt and pepper shakers, sugar, and what some
      might deem to be essential: marmite and butter, which are provided as well!
      <RouterLink
        class="hover:text-accent-light underline cursor-pointer"
        to="/gallery"
        >Take a look</RouterLink
      >.
    </p>
  </div>
  <p
    class="px-6 text:md font-bold tracking-wider sm:text-lg font-mono pt-8 pb-4 text-body"
  >
    breakfast
  </p>
  <div
    class="p-8 sm:py-12 transition-all duration-1000 ease-in-out bg-blue-panel text-ink flex flex-col sm:flex-row gap-6 items-center"
  >
    <img
      :src="breakfastImg"
      alt="Homemade granola, yoghurt and jam for breakfast"
      class="w-full sm:w-48 h-40 object-cover rounded-md shadow-md shrink-0"
    />
    <p class="leading-relaxed tracking-wider font-mono text-sm sm:text-md text-justify">
      A delicious breakfast of gluten free granola, yoghurt and fruit jam will be
      waiting for you alongside a selection of loose leaf tea, coffee, hot
      chocolate and Clippers decaffeinated and herbal tea bags. Farm fresh milk
      from Tytherington milk station is also provided.
      <RouterLink
        class="hover:text-accent-light underline cursor-pointer"
        to="/gallery"
        >Take a look</RouterLink
      >.
    </p>
  </div>
  <p
    class="px-6 text:md font-bold tracking-wider sm:text-lg font-mono pt-8 pb-4 text-body"
  >
    bathroom
  </p>
  <p
    class="p-8 sm:py-12 leading-relaxed tracking-wider font-mono text-sm sm:text-md pb text-justify transition-all duration-1000 ease-in-out bg-tan-panel text-ink"
  >
    The bathroom is fully equipped with a hand vanity unit with mirror and
    cupboard, a large standing shower in an Omnitub (handmade in Somerset!), as
    well as a bespoke composting toilet. The toilet is a separator design which
    requires no water!
    <RouterLink
      class="hover:text-accent-light underline cursor-pointer"
      to="/gallery"
      >Take a look</RouterLink
    >.
  </p>
  <p
    class="px-6 text:md font-bold tracking-wider sm:text-lg font-mono pt-8 pb-4 text-body"
  >
    bedroom
  </p>
  <div
    class="p-8 sm:py-12 transition-all duration-1000 ease-in-out bg-blue-panel text-ink flex flex-col sm:flex-row-reverse gap-6 items-center"
  >
    <img
      :src="bedroomImg"
      alt="Cushions and throws in the bedroom"
      class="w-full sm:w-48 h-40 object-cover rounded-md shadow-md shrink-0"
    />
    <p class="leading-relaxed tracking-wider font-mono text-sm sm:text-md text-justify">
      The main bedroom is a well lit yet cozy double bedroom with a sliding bed,
      large wardrobe, chest of drawers and cupboards for plenty of storage, and a
      fully stocked bookshelf. During the day the head of the bed can be raised to
      create a reclining seated area to sit in and relax. When you're ready for
      sleep two ropes allow you to slide the bed into the fully flat position
      within a few seconds for a comfortable nights sleep.
      <RouterLink
        class="hover:text-accent-light underline cursor-pointer"
        to="/gallery"
        >Take a look</RouterLink
      >.
    </p>
  </div>
  <p
    class="px-6 text:md font-bold tracking-wider sm:text-lg font-mono pt-8 pb-4 text-body"
  >
    Cab
  </p>

  <p
    class="p-8 sm:py-12 leading-relaxed tracking-wider font-mono text-sm sm:text-md pb text-justify transition-all duration-1000 ease-in-out bg-tan-panel text-ink"
  >
    The mobile library is first accessed through the drivers cab. There is a
    large hanging space for coats and overhead lockers for storage, as well as
    hooks for safe keeping of your keys. Sliding windows make this a well
    ventilated space, and window covers help to keep it snug. A single bed in
    this space is available should you require it. In the opposite corner to the
    driver side door a deadlocked door allows access to the main double bedroom
    and the rest of the accommodation.
  </p>
</template>
