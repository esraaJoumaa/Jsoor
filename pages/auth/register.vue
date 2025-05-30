<script setup lang="ts">
import * as z from 'zod'

const schema = z.object({
  name: z.string().min(2, 'name must be at least 2 characters'),

  email: z.string().email('Invalid email'),

  phone: z
    .string()
    .regex(/^\d{10,}$/, 'Phone number must be at least 10 digits'),

  password: z.string().min(8, 'Password must be at least 8 characters'),

  password_confirmation: z
    .string()
    .min(8, 'Password confirmation must be at least 8 characters')
    .refine((val, ctx) => {
      if (val !== ctx.parent.password) {
        throw new Error('Password confirmation must match the password')
      }

return true
    }),
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  name: undefined,
  email: undefined,
  phone: undefined,
  password: undefined,
  password_confirmation: undefined,
})

const toast = useToast()
async function onSubmit(event: FormSubmitEvent<Schema>) {
  toast.add({
    title: 'تم التسجيل بنجاح',
    description: 'تم إنشاء الحساب بنجاح.',
    color: 'success',
  })
  console.log(event.data)
}
</script>

<template>
  <div class="flex h-screen w-full">
    <div class="flex-1 bg-white flex items-center justify-center">
      <div class="w-full max-w-md px-6 space-y-6">
        <div class="text-center">
          <p class="text-lg md:text-3xl font-bold text-black mt-16">
            Create Account
          </p>
          <p class="text-[#868686] pt-3">
            Palese Enter your Information
          </p>
        </div>
        <UForm
          :schema="schema"
          :state="state"
          class="space-y-4"
          @submit="onSubmit"
        >
          <div class="grid grid-cols-2 gap-4">
            <div class="">
              <UFormField
                label="Name"
                name="name"
              >
                <UInput
                  v-model="state.name"
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
                  v-model="state.email"
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
                  v-model="state.phone"
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
                  v-model="state.password"
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
                  v-model="state.password_confirmation"
                  type="password"
                  placeholder="Confirm Password"
                />
              </UFormField>
            </div>
            <div class="">
              <UFormField
                label="Type"
              >
              <UCheckbox label="As Company" class="pt-2" />
              </UFormField>
            </div>
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
