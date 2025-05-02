<script setup lang="ts">
import * as z from "zod";

const schema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  birthDate: z.string().refine(
    (val) => !isNaN(Date.parse(val)),
    "Invalid date format"
  ),
  familyMembers: z.number().int().positive("Must be a positive integer"),
  need: z.string().min(5, "Need description must be at least 5 characters"),
});

type Schema = z.output<typeof schema>;

const state = reactive<Partial<Schema>>({
  fullName: undefined,
  birthDate: undefined,
  familyMembers: undefined,
  need: undefined,
});

const toast = useToast();

async function onSubmit(event: FormSubmitEvent<Schema>) {
  toast.add({
    title: "Success",
    description: "Your information has been submitted successfully!",
    color: "success",
  });
  console.log(event.data);
}

function navigateToServices() {
  window.location.href = "/services"; // Navigate to the services page
}
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <h1 class="text-2xl font-bold mb-4">Refugee Information</h1>

    <UPage>
      <template #right>
        <UForm
          :schema="schema"
          :state="state"
          class="space-y-4"
          @submit="onSubmit"
        >
          
          <UFormField label="Full Name" name="fullName">
            <UInput v-model="state.fullName" placeholder="Full Name" />
          </UFormField>

        
          <UFormField label="Birth Date" name="birthDate">
            <UInput
              v-model="state.birthDate"
              type="date"
              placeholder="Birth Date"
            />
          </UFormField>

          
          <UFormField label="Number of Family Members" name="familyMembers">
            <UInput
              v-model="state.familyMembers"
              type="number"
              placeholder="Family Members"
            />
          </UFormField>

        
          <UFormField label="Need" name="need">
            <UTextarea
              v-model="state.need"
              placeholder="Describe your needs here"
              rows="4"
            />
          </UFormField>

        
          <UButton type="submit" color="primary">Submit</UButton>
        </UForm>
      </template>
      <template #left>

      </template>
    </UPage>
  </div>
</template>

<style>

</style>