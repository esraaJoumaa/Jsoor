<script setup lang="ts">
</script>

<template>
  <div>
    <AppHeader />
    <section class="bg-blue-50 py-20 text-center border-b border-gray-200">
      <div class="container mx-auto px-4 max-w-5xl">
        <h1 class="text-5xl font-extrabold text-gray-900 mb-6">
          Welcome to Jsoor
        </h1>
        <p class="text-lg text-gray-700 max-w-3xl mx-auto mb-10">
          Your safe haven for stability and support. We extend a helping hand to overcome challenges and build a better future.
        </p>
      </div>
    </section>

    <section class="py-16 bg-white">
      <div class="container mx-auto px-4 max-w-5xl">
        <h2 class="text-4xl font-bold text-gray-900 text-center mb-12">
          Our Core Services
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <UCard class="p-2 h-92 text-center rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <h3 class="text-2xl font-semibold  text-primary mb-4">
              Job Opportunities
            </h3>
            <p class="text-gray-700 mb-6 leading-relaxed">
              We offer a wide range of job opportunities in various fields to help you achieve financial independence and build a successful career.
            </p>
            <div class="flex justify-center content-end">
              <NuxtLink
                to="/ads?category=jobs"
                class="inline-block px-8 py-3  bg-primary text-white rounded-md hover:bg-blue-700 transition-colors duration-300"
              >Browse Job </NuxtLink>
            </div>
          </UCard>

          <UCard class="p-2 h-92 text-center rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <h3 class="text-2xl font-semibold  text-primary mb-4">
              Shelter
            </h3>
            <p class="text-gray-700 mb-6 leading-relaxed">
              We provide safe and suitable housing options, both temporary and permanent, to offer a stable environment for you and your families.
            </p>
            <div class="flex justify-center content-end">
              <NuxtLink
                to="/ads?category=shelter"
                class="inline-block px-8 py-3  bg-primary text-white rounded-md hover:bg-blue-700 transition-colors duration-300"
              >Find Shelter</NuxtLink>
            </div>
          </UCard>

          <UCard class="p-2 h-92 text-center rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <h3 class="text-2xl font-semibold  text-primary mb-4">
              Psychological
            </h3>
            <p class="text-gray-700 mb-6 leading-relaxed">
              We believe in the importance of mental health. Therefore, we offer counseling and psychological support sessions to help you overcome difficulties and adapt to new circumstances.
            </p>
            <div class="flex justify-center content-end">
              <NuxtLink
                to="/ads?category=support"
                class="inline-block px-8 py-3  bg-primary text-white rounded-md hover:bg-blue-700 transition-colors duration-300"
              >Get Psychological</NuxtLink>
            </div>
          </UCard>
        </div>
      </div>
    </section>

    <AppFooter />
  </div>
</template>

<style scoped>

</style>
