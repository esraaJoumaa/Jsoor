<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCompanyAprroveAdvertisments } from '~/queries/auth/company'

const route = useRoute()
const router = useRouter()

const { data: advertismentDataRequests, refresh: refreshAdminRequestsData, pending } = useCompanyAprroveAdvertisments()
const advertismentRequests = computed(() => advertismentDataRequests.value || [])

const allAds = ref([])
const activeCategory = ref('all')

// A helper function to map Arabic service_type to English category and display names
const mapServiceTypeToCategory = (serviceType) => {
  switch (serviceType) {
    case 'دعم نفسي':
      return { category: 'support', category_display: 'Psychological Support' };
    case 'فرص عمل':
      return { category: 'jobs', category_display: 'Job Opportunity' };
    case 'منازل':
      return { category: 'shelter', category_display: 'Shelter' };
    default:
      return { category: 'other', category_display: serviceType }; // Fallback
  }
}

const fetchAds = async () => {
  const mappedAds = [];
  advertismentRequests.value.forEach(serviceCategory => {
    const { category, category_display } = mapServiceTypeToCategory(serviceCategory.service_type);

    serviceCategory.ads.forEach(ad => {
      mappedAds.push({
        id: ad.id,
        title: ad.title,
        description: ad.description,
        category: category,
        category_display: category_display,
        location: ad.location,
        contact: ad.meet_link || null, // Assuming meet_link can be used as contact if no direct contact field
        shadowStyle: {}
      });
    });
  });
  allAds.value = mappedAds;
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

onMounted(async () => {
  await refreshAdminRequestsData() // Fetch data when the component mounts
  fetchAds() // Populate allAds with the fetched data

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

// Watch for changes in advertismentDataRequests and update allAds
watch(advertismentDataRequests, () => {
  fetchAds()
}, { deep: true }) // Use deep watch for nested changes

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
            <<NuxtLink :to="ad.contact"  v-if="ad.contact"
              class="text-gray-600 text-sm mb-4">
              {{ ad.contact }}
            </NuxtLink>
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
