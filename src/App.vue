<script setup lang="ts">
import Footer from "./components/Footer.vue"
import Header from "./components/Header.vue"
</script>

<template>
  <header class="p-6 max-w-6xl mx-auto">
    <Header></Header>
  </header>
  <main>
    <router-view class="max-w-6xl mx-auto" />
    <Footer></Footer>
  </main>
</template>
