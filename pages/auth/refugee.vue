<script setup lang="ts">
import { useGlobalStore } from '~/stors/global'
import { useSendNeed } from '@@/queries/auth/refugee'
import type { user } from '~/models/loginResponse'

const globalStore = useGlobalStore();

const refugeeForm = ref({
  name: '',
  phone: '',
  need: '',
  number_of_family_member:'',
  date_of_birth:'',
  status:'pending',
  user_id:`${globalStore.user_id}`

})

const toast = useToast()
const isLoading = ref(false)
const router = useRouter()

const registerRefugee = async () => {
  isLoading.value = true
  const { data, status } = await useSendNeed(refugeeForm.value);

  if (status.value === 'success') {
    const registrationData = data.value as user;
    router.push('/')
  }
 else {
  toast.add({ description: 'Email or Password is un Courrect', color: 'error' });
  }
}

  isLoading.value = false;
</script>

<template>
  <div class="flex h-screen w-full">
    <div class="flex-1 bg-white flex items-center justify-center">
      <div class="w-full max-w-md px-6 space-y-6">
        <div class="text-center">
          <p class="text-2xl font-bold mb-4">
            Refugee Information
          </p>
        </div>
        <UForm
          class="space-y-4"
          ref="form"
          action="#"
          :state="refugeeForm"
          @submit="registerRefugee"
        >
          <div class="grid grid-cols-2 gap-4">
            <div class="">
              <UFormField
                label="Name"
                name="name"
              >
                <UInput
                  v-model="refugeeForm.name"
                  placeholder="Name"
                />
              </UFormField>
            </div>
            <div class="">
              <UFormField
                label="Phone"
                name="pheon"
              >
                <UInput
                  v-model="refugeeForm.phone"
                  placeholder="Phone"
                />
              </UFormField>
            </div>
            <div class="">
              <UFormField
                label="Birth Date"
                name="birthDate"
              >
                <UInput
                  v-model="refugeeForm.date_of_birth"
                  type="date"
                  placeholder="Birth Date"
                />
              </UFormField>
            </div>

            <div class="">
              <UFormField
                label="Number of Family Members"
                name="familyMembers"
              >
                <UInput
                  v-model="refugeeForm.number_of_family_member"
                  type="number"
                  placeholder="Family Members"
                />
              </UFormField>
            </div>

          </div>
          <div class="w-full">
            <UFormField
              label="Need"
              name="need"
              class="w-full"
            >
              <UTextarea
                v-model="refugeeForm.need"
                class="w-full"
                placeholder="Describe your needs here"
                aria-rowspan="4"
              />
            </UFormField>
          </div>

          <div class="text-center">
            <UButton
              type="submit"
              color="primary"
              block
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
</template>

<style>

</style>
