<script lang="ts" setup>
import { useLoginAdmin } from '@@/queries/auth/admin'
import type { user } from '~/models/loginResponse'
import { useGlobalStore } from '~/stors/global'

const userForm = ref({
  email: '',
  password: '',
})

const isLoading = ref(false)
const toast = useToast()
const form = ref()
const router = useRouter()

const formIsValid = computed(() => {
  if (!form.value) {
    return true
  }

  return form.value.errors && Object.keys(form.value.errors).length > 0
})

const login = async () => {
  isLoading.value = true
  const { data, status } = await useLoginAdmin(userForm.value)
  if (status.value == 'success') {
    const globalStore =useGlobalStore()
    console.log(`data ${data.value}`)
    const loginData =data.value as user
    globalStore.token= loginData.token
    globalStore.role=loginData.user.type
    toast.add({ description: `Login Successful`, color: 'success' })
    await router.push('/dashboard')
  }
  else {
    toast.add({ description: 'Email or Password is un Courrect', color: 'error' })
  }
  isLoading.value = false
}
</script>

<template>
  <div class="flex h-screen w-full bg-cover loginPage bg-center">
    <div class="flex-1 bg-white flex items-center justify-center">
      <div class="w-full max-w-md px-6 space-y-6">
        <div class="text-center">
          <p class="text-lg md:text-3xl font-bold text-black mt-16">
            Super Admin Login
          </p>
          <p class="text-[#868686] pt-3">
            enter your Email and Password
          </p>
        </div>
        <UForm
          ref="form"
          :state="userForm"
          action="#"
          class="space-y-4"
          @submit="login"
        >
          <UFormField
            class="text-primary"
            label="Email"
            name="email"
          >
            <UInput
              v-model="userForm.email"
              class="border-0 rounded-lg bg-white text-black block"
              size="xl"
              variant="subtle"
            />
          </UFormField>
          <UFormField
            class="text-primary"
            label="Password"
            name="password"
          >
            <UInput
              v-model="userForm.password"
              class="border-0 rounded-lg bg-white text-black block"
              size="xl"
              variant="subtle"
            />
          </UFormField>
          <UButton
            type="submit"
            :disabled="formIsValid"
            :loading="isLoading"
            block
            class="w-full sm:mt-3 disabled:bg-primary text-white bg-primary hover:bg-blue-300 rounded-full h-12 py-2.5 font-bold text-center"
          >
            <span :disabled="formIsValid" class="font-bold text-lg">Sign in</span>
          </UButton>
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