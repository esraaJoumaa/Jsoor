<script setup>
import { useCompanyAprroveAdvertisments } from '@@/queries/auth/company';

const ad = ref({
  title: "",
  description: "",
  start_date: "",
  end_date: "",
  location: "",
  service_id: 1
})

const submitAd = async () => {
  const { data, status } = await useCompanyAprroveAdvertisments(ad.value)
  if (status.value == 'success') {
    toast.add({ description: `Successful`, color: 'success' })
  }
  else {
    toast.add({ description: 'Filed', color: 'error' })
  }
  isLoading.value = false
}

const getServiceName = (serviceId) => {
  const services = {
    1: 'Psychological Support',
    2: 'Job Opportunity',
    3: 'Shelter'
  }
  return services[serviceId]
}

</script>


<template>
  <div class="min-h-screen bg-gray-50 py-16 px-4 sm:px-6">
    <div class="max-w-3xl mx-auto">
      <div class="text-center mb-12">
        <h1 class="text-4xl font-extrabold text-primary mb-4">Create New Ad</h1>
        <p class="text-lg text-gray-700">
          Post your opportunity for jobs, shelter or psychological support
        </p>
      </div>

      <div class="bg-white shadow-lg rounded-xl overflow-hidden">
        <UForm @submit="submitAd" class="p-8"
        ref="form"
          :state="ad"
          action="#">

          <div class="mb-8">
            <label class="block text-sm font-medium text-gray-700 mb-2">Ad Title</label>
            <input
              v-model="ad.title"
              type="text"
              required
              class="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter ad title"
            />
          </div>

          <div class="mb-8">
            <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              v-model="ad.description"
              rows="4"
              required
              class="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter detailed description"
            ></textarea>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
              <input
                v-model="ad.start_date"
                type="date"
                required
                class="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">End Date</label>
              <input
                v-model="ad.end_date"
                type="date"
                required
                class="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <input
                v-model="ad.location"
                type="text"
                required
                class="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter location"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Service Type</label>
              <select
                v-model="ad.service_id"
                required
                class="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="1">Psychological Support</option>
                <option value="2">Job Opportunity</option>
                <option value="3">Shelter</option>
              </select>
            </div>
          </div>

          <div class="text-center">
            <button
              type="submit"
              class="inline-flex items-center px-8 py-4 border border-transparent text-lg font-bold rounded-md shadow-sm text-white bg-primary hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
            >
              Publish Ad
            </button>
          </div>
        </UForm>
      </div>

      <div class="mt-16">
        <h3 class="text-2xl font-bold text-center mb-8 text-gray-800">Ad Preview</h3>
        
        <div class="bg-white p-6 rounded-lg shadow-md transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl">
          <h3 class="text-xl font-semibold text-primary mb-3">
            {{ ad.title || '[Ad Title Here]' }}
          </h3>
          <p class="text-gray-700 mb-4 leading-relaxed">
            {{ ad.description || '[Ad description would appear here]' }}
          </p>
          <div class="text-sm text-gray-600">
            <p class="mb-1">
              <span class="font-medium">Period:</span> 
              {{ ad.start_date || '[Not specified]' }} to {{ ad.end_date || 'Not specified]' }}
            </p>
            <p class="mb-1">
              <span class="font-medium">Location:</span> 
              {{ ad.location || '[Not specified]' }}
            </p>
            <p>
              <span class="font-medium">Service:</span> 
              {{ getServiceName(ad.service_id) || '[Not specified]' }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style>
</style>
