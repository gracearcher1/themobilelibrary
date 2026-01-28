<script setup lang="ts">
import Footer from "./components/Footer.vue"
import Header from "./components/Header.vue"
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <header class="p-6 max-w-5xl mx-auto w-full">
      <Header></Header>
    </header>
    <main class="flex-1 max-w-5xl mx-auto w-full">
      <router-view />
    </main>
    <footer class="max-w-5xl mx-auto w-full">
      <Footer></Footer>
    </footer>
  </div>
</template>
