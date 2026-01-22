<script setup>
defineProps({
  msg: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="greetings">
    <h1 class="font-medium text-4xl relative -top-2.5 text-center lg:text-left">
      {{ msg }}
    </h1>
  </div>
</template>
