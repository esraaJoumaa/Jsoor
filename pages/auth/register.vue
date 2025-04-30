<script setup lang="ts">
import * as z from "zod";

const schema = z.object({
  name: z.string().min(2, "name must be at least 2 characters"),

  email: z.string().email("Invalid email"),

  phone: z
    .string()
    .regex(/^\d{10,}$/, "Phone number must be at least 10 digits"),

  type: z.enum(["refugee", "company"], {
    required_error: "Please select a valid type",
  }),

  password: z.string().min(8, "Password must be at least 8 characters"),

  password_confirmation: z
    .string()
    .min(8, "Password confirmation must be at least 8 characters")
    .refine((val, ctx) => {
      if (val !== ctx.parent.password) {
        throw new Error("Password confirmation must match the password");
      }
      return true;
    }),
});

type Schema = z.output<typeof schema>;

const state = reactive<Partial<Schema>>({
  name: undefined,
  email: undefined,
  phone: undefined,
  type: undefined,
  password: undefined,
  password_confirmation: undefined,
});

const toast = useToast();
async function onSubmit(event: FormSubmitEvent<Schema>) {
  toast.add({
    title: "تم التسجيل بنجاح",
    description: "تم إنشاء الحساب بنجاح.",
    color: "success",
  });
  console.log(event.data);
}
</script>

<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen bg-gray-100"
  >
    <h1 class="text-2xl font-bold mb-4">إنشاء حساب جديد</h1>

    <UPage>
      <template #right>
        <UForm
          :schema="schema"
          :state="state"
          class="space-y-4"
          @submit="onSubmit"
        >
          <UFormField label="Name" name="name">
            <UInput v-model="state.name" placeholder="Full Name" />
          </UFormField>

          <UFormField label="Email" name="email">
            <UInput v-model="state.email" placeholder="Email Address" />
          </UFormField>

          <UFormField label="Phone" name="phone">
            <UInput v-model="state.phone" placeholder="Phone Number" />
          </UFormField>

          <UFormField label="Type" name="type">
            <USelect v-model="state.type" placeholder="Select Type">
              <option value="refugee">Displaced</option>
              <option value="company">Company</option>
            </USelect>
          </UFormField>

          <UFormField label="Password" name="password">
            <UInput
              v-model="state.password"
              type="password"
              placeholder="Password"
            />
          </UFormField>

          <UFormField label="Confirm Password" name="password_confirmation">
            <UInput
              v-model="state.password_confirmation"
              type="password"
              placeholder="Confirm Password"
            />
          </UFormField>

          <UButton type="submit" color="primary">Register</UButton>
        </UForm>
      </template>
    </UPage>
  </div>
</template>

<style></style>
