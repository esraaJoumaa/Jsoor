<script lang="ts" setup>
import type { NavigationMenuItem } from '@nuxt/ui'

const items: NavigationMenuItem[] = [
  {
    label: 'Companies',
    icon: 'i-lucide-users',
    to: '/dashboard/company',
  },
  {
  label: 'ADS',
  icon: 'i-lucide-users',
  to: '/dashboard',
},
]
</script>

<template>
  <div>
    <UNavigationMenu
      :items="items"
      class="text-Sequand"
      orientation="vertical"
      :ui="{
        link: 'hover:text-primary text-lg py-4 px-4 transition-colors duration-200',
        list: 'space-y-2',
      }"
    >
      <template #item="itemValue">
        <h1
          class="hover:cursor-pointer"
          :class="{ 'text-primary': itemValue.item.to===useRoute().fullPath }"
        >
          <span class="mt-5 text-xl px-2">
            <Icon
              :name="itemValue.item.icon"
              class=""
            />
          </span>
          {{ itemValue.item.label }}
        </h1>
      </template>
    </UNavigationMenu>
  </div>
</template>

<style>
</style>
