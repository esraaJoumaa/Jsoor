<script setup lang="ts">
import { useRegisterCompany } from '@@/queries/auth/company'
import type { Loction } from '@@/models/location'
import { useGlobalStore } from '~/stors/global';

const globalStore = useGlobalStore();

const companyForm = ref({
  map_location: '',
  social_link: '',
  name: '',
  phone: '',
  description: '',
  user_id:`${globalStore.user_id}`
})

const value = ref('Shelters')

const isLoading = ref(false)
const toast = useToast()
const form = ref()
const router = useRouter()

const loginCompany = async () => {
   companyForm.value.map_location = selectedLocationText.value;
  isLoading.value = true
  const { status } = await useRegisterCompany(companyForm.value)
  if (status.value == 'success') {

    toast.add({ description: `loginCompany Successful`, color: 'success' })
    // await router.push('/')
  }
  else {
    toast.add({ description: 'Email or Password is un Courrect', color: 'error' })
  }
  isLoading.value = false
}

const isMapModelOpen = ref(false)
const selecetLocation = ref<Loction | null>(null)
const sendLocationToApi = ref('')

const handelLocationSelectes = (location: { lat: number; lng: number }) => {
  selecetLocation.value = location
  sendLocationToApi.value = `${location.lat}|${location.lng}`
}

const selectedLocationText = computed(() => {
  if (selecetLocation.value) {
    return `lat: ${selecetLocation.value.lat.toFixed(4)}, lng: ${selecetLocation.value.lng.toFixed(4)}`
  }
  return 'Choose your location using map'
})
</script>

<template>
  <div class="flex h-screen w-full">
    <div class="flex-1 bg-white flex items-center justify-center">
      <div class="w-full max-w-md px-6 space-y-6">
        <div class="text-center">
          <p class="text-2xl font-bold mb-4">
            Company Information
          </p>
        </div>
        <UForm
          ref="form"
          :state="companyForm"
          action="#"
          class="space-y-4"
          @submit="loginCompany"
        >
          <div class="grid grid-cols-2 gap-4">
            <div class="">
              <UFormField
                label="name"
                name="name"
              >
                <UInput
                  v-model="companyForm.name"
                  placeholder="name"
                />
              </UFormField>
            </div>

            <div class="">
              <UFormField
                label="Map Location"
                name="mapLocation"
              >
                <UInput
                  v-model="companyForm.map_location"
                  aria-readonly="true"
                  :value="selectedLocationText"
                  @click="isMapModelOpen=true"
                />
              </UFormField>
            </div>

            <div class="">
              <UFormField
                label="phone"
                name="phone"
              >
                <UInput
                  v-model="companyForm.phone"
                  type="text"
                  placeholder="phone"
                />
              </UFormField>
            </div>

            <div class="">
              <UFormField
                label="social_link"
                name="social_link"
              >
                <UInput
                  v-model="companyForm.social_link"
                  placeholder="social_link"
                />
              </UFormField>
            </div>
          </div>
            <div class="text-center mx-auto">
              <UFormField
                class="text-center mx-auto"
                label="description"
                name="description"
              >
                <UTextarea
                  v-model="companyForm.description"
                  placeholder="description"
                  class="w-full"
                  :rows="1"
                />
              </UFormField>
            </div>
          <div class="text-center mx-auto">
            <UButton
              block
              type="submit"
              color="primary"
            >
              Submit
            </UButton>
          </div>
        </UForm>
      </div>
    </div>
    <div class="flex-1 bg-primary flex items-center justify-center relative overflow-hidden">
      <img
        class="w-96"
        src="../../public/imageRegister.png"
      >
    </div>
  </div>
  <UModal
    v-model:open="isMapModelOpen"
    title="Please Select Your Location On Map"
    :ui="{footer:'justify-end'}"
  >   
      <template #body>
        <MpaLocation
          :initial-location="selecetLocation"
          @location-selected="handelLocationSelectes"
        />
      </template>
      <template #footer>
        <div class="flex justify-end">
          <UButton
            color="primary"
            variant="solid"
            @click="isMapModelOpen=false;"
          >
            Done
          </UButton>
        </div>
      </template>
  </UModal>
</template>
