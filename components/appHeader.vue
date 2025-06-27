<script setup lang="ts">
</script>

<template>
  <header class="bg-white shadow-md py-4">
    <div class="container mx-auto px-4 flex justify-between items-center max-w-6xl">
      <NuxtLink
        to="/"
        class="text-2xl font-bold text-blue-600 hover:text-blue-800 transition-colors duration-300"
      >
        Jsoor Project
      </NuxtLink>
      <nav>
        <ul class="flex space-x-6">
          <li>
            <NuxtLink
              to="/"
              class="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-300"
            >Home</NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/ads"
              class="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-300"
            >Ads</NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/about"
              class="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-300"
            >About</NuxtLink>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style scoped>
</style>
