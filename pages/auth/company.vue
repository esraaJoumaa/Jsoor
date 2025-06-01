<script setup lang="ts">
import { useloginCompany } from '@@/queries/auth/company'

const companyForm = ref({
  mapLocation: '',
  socialLink: '',
  companyName: '',
  phone: '',
  description: '',
})

const isLoading = ref(false)
const toast = useToast()
const form = ref()
const router = useRouter()

const loginCompany = async () => {
  isLoading.value = true
  const { status } = await useloginCompany(companyForm.value)
  if (status.value == 'success') {
    toast.add({ description: `loginCompany Successful`, color: 'success' })
    await router.push('/')
  }
  else {
    toast.add({ description: 'Email or Password is un Courrect', color: 'error' })
  }
  isLoading.value = false
}
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
                label="mapLocation"
                name="mapLocation"
              >
                <UInput
                  v-model="companyForm.mapLocation"
                  placeholder="Map Location"
                />
              </UFormField>
            </div>

            <div class="">
              <UFormField
                label="socialLink"
                name="socialLink"
              >
                <UInput
                  v-model="companyForm.socialLink"
                  placeholder="socialLink"
                />
              </UFormField>
            </div>

            <div class="">
              <UFormField
                label="companyName"
                name="companyName"
              >
                <UInput
                  v-model="companyForm.companyName"
                  placeholder="companyName"
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
                  type="date"
                  placeholder="phone"
                />
              </UFormField>
            </div>

            <div class="">
              <UFormField
                label="description"
                name="description"
              >
                <UTextarea
                  v-model="companyForm.description"
                  placeholder="description"
                  aria-rowcount="4"
                />
              </UFormField>
            </div>
            <div class="">
              <UButton
                type="submit"
                color="primary"
              >
                Submit
              </UButton>
            </div>
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
</template>
