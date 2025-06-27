<script setup lang="ts">
import { useGetCompany } from '~/queries/auth/admin';

const { data, status } = await useGetCompany()
const page = ref(0)
</script>

<template>
  <div class="flex bg-[#F5F5F5] flex-col h-screen overflow-hidden">
    <UDashboardNavbar class="bg-primary  shadow-sm">
      <template #left>
        <div class="flex items-center">
          <span class="text-white font-semibold text-xl">Jsoor</span>
        </div>
      </template>
      <template #right>
        <div class="flex items-center gap-4">
          <span class="text-white font-medium">Super Admin</span>
          <UAvatar
            src="https://github.com/benjamincanac.png"
            size="md"
          />
        </div>
      </template>
    </UDashboardNavbar>
    <div class="flex flex-1">
      <UDashboardSidebar
        resizable
        class="bg-primary overflow-y-auto"
      >
        <DashboardSideBar />
      </UDashboardSidebar>
      <div class="flex-1 p-6">
        <div class="flex justify-between items-center mb-4">
          <h1 class="text-2xl text-primary font-bold pb-2">
            Companies
          </h1>
        </div>
        <div class="rounded-lg bg-white shadow-xl pb-5">
          <UTable
            ref="table"
            :data="data"
            sticky
            class="flex-1 pt-0 max-h-[500px]"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>
