<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const allAds = ref([])
const activeCategory = ref('all')

const fetchAds = async () => {
  allAds.value = [
    { id: 1, title: 'Job Opportunity: Web Developer', description: 'Company looking for a web developer with 2 years of experience, knowledge of Vue.js and Nuxt.js preferred. Flexible and stimulating work environment.', category: 'jobs', category_display: 'Job Opportunity', location: 'Istanbul', contact: 'jobs@example.com' },
    { id: 2, title: 'Temporary Shelter for Families', description: 'Fully furnished 3-room apartment in a safe and quiet area, close to public facilities.', category: 'shelter', category_display: 'Shelter', location: 'Berlin', contact: '+123456789' },
    { id: 3, title: 'Free Psychological Support Sessions', description: 'Group and individual sessions with psychologists to help displaced persons adapt and overcome trauma.', category: 'support', category_display: 'Psychological Support', contact: 'support@example.com' },
    { id: 4, title: 'Job Opportunity: Maintenance Technician', description: 'General maintenance technician required for a service institution, preferably with experience in electricity and plumbing.', category: 'jobs', category_display: 'Job Opportunity', location: 'Lebanon', contact: 'tech@example.com' },
    { id: 5, title: 'Shelter for University Students', description: 'Shared room for students near the university, includes internet, water, and electricity bills.', category: 'shelter', category_display: 'Shelter', location: 'Gaziantep', contact: 'students@example.com' },
    { id: 6, title: 'Remote Psychological Support', description: 'Online counseling services for individuals facing psychological difficulties, in complete confidentiality.', category: 'support', category_display: 'Psychological Support', contact: 'online@example.com' },
    { id: 7, title: 'Job Opportunity: Arabic Language Teacher', description: 'Required Arabic language teacher for displaced children, part-time.', category: 'jobs', category_display: 'Job Opportunity', location: 'Marseille', contact: 'arabic_teacher@example.com' },
    { id: 8, title: 'Emergency Shelter for Small Family', description: 'Temporary studio apartment available for a small family in urgent need of shelter.', category: 'shelter', category_display: 'Shelter', location: 'Munich', contact: 'emergency_shelter@example.com' },
    { id: 9, title: 'Stress Relief Workshops', description: 'Interactive workshops to help individuals manage stress and anxiety in difficult circumstances.', category: 'support', category_display: 'Psychological Support', contact: 'stress_relief@example.com' },
  ].map(ad => ({ ...ad, shadowStyle: {} }))
}

const filteredAds = computed(() => {
  if (activeCategory.value === 'all') {
    return allAds.value
  }

return allAds.value.filter(ad => ad.category === activeCategory.value)
})

const setCategory = (category) => {
  activeCategory.value = category
  const newQuery = category === 'all' ? {} : { category: category }
  router.push({ query: newQuery })
}

onMounted(() => {
  fetchAds()
  if (route.query.category) {
    activeCategory.value = route.query.category
  }
})

watch(() => route.query.category, (newCategory) => {
  if (newCategory) {
    activeCategory.value = newCategory
  } else {
    activeCategory.value = 'all'
  }
})

const handleMouseMove = (event) => {
  const card = event.currentTarget
  const rect = card.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top

  const adId = parseInt(card.dataset.adId)
  const ad = allAds.value.find(a => a.id === adId)

  if (ad) {
    ad.shadowStyle = {
      background: `radial-gradient(circle at ${x}px ${y}px, rgba(0, 0, 0, 0.07) 0%, transparent 70%)`,
    }
  }
}

const handleMouseLeave = (event) => {
  const card = event.currentTarget
  const adId = parseInt(card.dataset.adId)
  const ad = allAds.value.find(a => a.id === adId)
  if (ad) {
    ad.shadowStyle = {}
  }
}
</script>

<template>
  <div>
    <AppHeader />

    <section class="bg-blue-50 py-16 text-center border-b border-gray-200">
      <div class="container mx-auto px-4 max-w-5xl">
        <h1 class="text-4xl font-extrabold text-gray-900 mb-4">
          Jasoor Ads
        </h1>
        <p class="text-lg text-gray-700">
          Browse the latest opportunities and aid available in work, shelter, and psychological support.
        </p>
      </div>
    </section>

    <section class="py-10 bg-white">
      <div class="container mx-auto px-4 max-w-5xl">
        <UButtonGroup class="mb-10 flex flex-wrap justify-center gap-3">
          <UButton
            label="All"
            :variant="activeCategory === 'all' ? 'solid' : 'outline'"
            class="px-6 py-3 text-lg"
            @click="setCategory('all')"
          />
          <UButton
            label="Job Opportunities"
            :variant="activeCategory === 'jobs' ? 'solid' : 'outline'"
            class="px-6 py-3 text-lg"
            @click="setCategory('jobs')"
          />
          <UButton
            label="Shelter"
            :variant="activeCategory === 'shelter' ? 'solid' : 'outline'"
            class="px-6 py-3 text-lg"
            @click="setCategory('shelter')"
          />
          <UButton
            label="Psychological Support"
            :variant="activeCategory === 'support' ? 'solid' : 'outline'"
            class="px-6 py-3 text-lg"
            @click="setCategory('support')"
          />
        </UButtonGroup>

        <div
          v-if="filteredAds.length === 0"
          class="text-center text-xl text-gray-600 py-12"
        >
          <p>No ads currently available in this category.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <UCard
            v-for="ad in filteredAds"
            :key="ad.id"
            :data-ad-id="ad.id"
            class="ad-card p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 relative overflow-hidden"
            @mousemove="handleMouseMove"
            @mouseleave="handleMouseLeave"
          >
            <h3 class="text-xl font-semibold text-blue-600 mb-3">
              {{ ad.title }}
            </h3>
            <p class="text-gray-700 mb-4 leading-relaxed">
              {{ ad.description }}
            </p>
            <p class="text-gray-600 text-sm mb-2">
              <strong>Category:</strong> {{ ad.category_display }}
            </p>
            <p
              v-if="ad.location"
              class="text-gray-600 text-sm mb-2"
            >
              <strong>Location:</strong> {{ ad.location }}
            </p>
            <p
              v-if="ad.contact"
              class="text-gray-600 text-sm mb-4"
            >
              <strong>Contact:</strong> {{ ad.contact }}
            </p>
            <NuxtLink
              :to="`/ads/${ad.id}`"
              class="inline-block px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-300"
            >View Details</NuxtLink>
            <div
              class="card-shadow absolute top-0 left-0 w-full h-full pointer-events-none"
              :style="ad.shadowStyle"
            />
          </UCard>
        </div>
      </div>
    </section>

    <AppFooter />
  </div>
</template>

<style scoped>
.card-shadow {
  transition: background 0.1s ease-out;
}
</style>
