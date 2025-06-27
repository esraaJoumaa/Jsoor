<script setup lang="ts">
import { useGlobalStore } from '~/stors/global'
import { useRegisterUser } from '@@/queries/auth/register'
import type { user } from '~/models/loginResponse'



const registerForm = ref({
  name: '',
  email: '',
  phone: '',
  password: '',
  password_confirmation: '',
  type: 'company',
})

const isLoading = ref(false)
const toast = useToast()
const form = ref()
const router = useRouter()

const register = async () => {
  isLoading.value = true;
  const { data, status } = await useRegisterUser(registerForm.value);
  if (status.value === 'success') {
    const globalStore = useGlobalStore();
    const registrationData = data.value as user;
    globalStore.token = registrationData.token;
    globalStore.role = registrationData.user.type;
    globalStore.user_id = registrationData.user.id
  toast.add({
    title: 'sucsses',
    description: 'create account successfully',
    color: 'success',
  })
   await router.push('/auth/company');
}
else {
    toast.add({ description: 'Email or Password is un Courrect', color: 'error' });
  }

  isLoading.value = false;
};


</script>

<template>
  <div class="flex h-screen w-full bg-cover loginPage bg-center">
    <div class="flex-1 bg-white flex items-center justify-center">
      <div class="w-full max-w-md px-6 space-y-6">
        <div class="text-center">
          <p class="text-lg md:text-3xl font-bold text-black mt-16">
            Create Company Account
          </p>
          <p class="text-[#868686] pt-3">
            Palese Enter your Information
          </p>
        </div>
        <UForm
          ref="form"
          class="space-y-4"
          :state="registerForm"
          action="#"
          @submit="register"
        >
          <div class="grid grid-cols-2 gap-4">
            <div class="">
              <UFormField
                label="Name"
                name="name"
              >
                <UInput
                  v-model="registerForm.name"
                  placeholder="Full Name"
                />
              </UFormField>
            </div>
            <div class="">
              <UFormField
                label="Email"
                name="email"
              >
                <UInput
                  v-model="registerForm.email"
                  placeholder="Email Address"
                />
              </UFormField>
            </div>
            <div class="">
              <UFormField
                label="Phone"
                name="phone"
              >
                <UInput
                  v-model="registerForm.phone"
                  placeholder="Phone Number"
                />
              </UFormField>
            </div>

            <div class="">
              <UFormField
                label="Password"
                name="password"
              >
                <UInput
                  v-model="registerForm.password"
                  type="password"
                  placeholder="Password"
                />
              </UFormField>
            </div>
            <div class="">
              <UFormField
                label="Confirm Password"
                name="password_confirmation"
              >
                <UInput
                  v-model="registerForm.password_confirmation"
                  type="password"
                  placeholder="Confirm Password"
                />
              </UFormField>
            </div>
            
          </div>
          <div class="flex justify-between">
            <div class="">
              <UButton
                type="submit"
                color="primary"
              >
                Register
              </UButton>
            </div>
            <p>
              <NuxtLink
                class="text-black flex underline mx-2"
                to="/auth/login"
              >Do Have Account <span class="text-primary underline ml-1"> Login</span></NuxtLink>
            </p>
          </div>
        </UForm>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.loginPage{
  background-image: url('../../public/loginImage.jpg') !important;
}
</style>
