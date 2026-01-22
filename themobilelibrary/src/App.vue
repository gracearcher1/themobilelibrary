<template>
  <header
    class="leading-relaxed lg:flex lg:items-center lg:pr-[calc(var(--section-gap)/2)]"
  >
    <nav class="flex gap-4 mt-4">
      <RouterLink to="/" class="text-blue-600 hover:underline">home</RouterLink>
      <RouterLink to="/book" class="text-blue-600 hover:underline"
        >book a stay</RouterLink
      >
      <RouterLink to="/gallery" class="text-blue-600 hover:underline"
        >gallery</RouterLink
      >
    </nav>

    <div class="wrapper lg:flex lg:items-start lg:flex-wrap">
      <Title msg="the mobile library" />
    </div>
  </header>

  <main>
    <router-view />
  </main>
</template>
