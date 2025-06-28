<script setup lang="ts">
import type { companyModel } from '~/models/companyModel';
import { useApproveAdvertismentRequest, useGetADS, useGetCompany, useRejectAdvertismentRequest, useUpdateCompanyRequest } from '~/queries/auth/admin';
import type { TableColumn } from '@nuxt/ui'
import type { companyRequestModel } from '~/models/companyRequestModel';

const columns: TableColumn<companyModel>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => `${row.getValue('id')}`,
  },
   {
    accessorKey: 'user_id',
    header: 'User Id',
    cell: ({ row }) => `${row.getValue('user_id')}`,
  },
   {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => `${row.getValue('name')}`,
  },
   {
    accessorKey: 'social_link',
    header: 'Social Link',
    cell: ({ row }) => `${row.getValue('social_link')}`,
  },
   {
    accessorKey: 'description',
    header: 'Description',
    cell: ({ row }) => `${row.getValue('description')}`,
  },
   {
    accessorKey: 'location',
    header: 'Lcation',
    cell: ({ row }) => `${row.getValue('location')}`,
  },
   {
    accessorKey: 'phone',
    header: 'Phone',
    cell: ({ row }) => `${row.getValue('phone')}`,
  },
   {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => `${row.getValue('status')}`,
  },
   {
    accessorKey: 'map_location',
    header: 'Map Location',
    cell: ({ row }) => `${row.getValue('map_location')}`,
  },
   {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => `${row.getValue('status')}`,
  },
   {
    id: 'actions',
    cell: ({ row }) => {
      return h(
        'div',
        { class: 'text-right' },
        h(
          UDropdownMenu,
          {
            content: {
              align: 'end',
            },
            items: getRowItems(row),
            'aria-label': 'Actions dropdown',
          },
          () =>
            h(UButton, {
              icon: 'i-lucide-ellipsis-vertical',
              color: 'neutral',
              variant: 'ghost',
              class: 'ml-auto',
              'aria-label': 'Actions dropdown',
            }),
        ),
      )
    },
  },
]
const openModel = ref(false)
const modalMessage = ref('')
const modalTitle = ref('')
const selectedAdmin = ref<companyRequestModel | null>(null)
const modalActionType = ref<'approve' | 'reject' | null>(null)

const route = useRoute()

const UButton = resolveComponent('UButton')
const UDropdownMenu = resolveComponent('UDropdownMenu')


const toast = useToast()

function openModal(action: 'approve' | 'reject', admin: companyRequestModel) {
  selectedAdmin.value = admin
  modalActionType.value = action
  modalTitle.value = `${action === 'approve' ? 'Approve' : 'Reject'} Request for ${admin.name}`
  modalMessage.value = `Are you sure you want to ${action === 'approve' ? 'approve' : 'reject'} the request for ${admin.full_name}?`
  openModel.value = true
}
function cancelAction() {
  openModel.value = false
  selectedAdmin.value = null
  modalActionType.value = null
}

async function confirmAction() {
  if (!selectedAdmin.value || !modalActionType.value) {
    return
  }
  const action = modalActionType.value
  let apiResponse
  const adminId = selectedAdmin.value.id
  let successMessage = ''
    if (action === 'approve') {
      successMessage = `Company Approved Successfully ${selectedAdmin.value.name}`
      const { execute, clear } = useUpdateCompanyRequest(adminId)
      refreshAdminRequestsData()
      clear()
      apiResponse = await execute()
    }
    toast.add({
      title: successMessage,
      color: 'success',
      icon: 'i-lucide-circle-check',
    })
    await refreshNuxtData('adminRequests')
    openModel.value = false
    selectedAdmin.value = null
    modalActionType.value = null
}
function getRowItems(row: Row<companyRequestModel>) {
  const admin = row.original

  return [
    {
      label: 'Copy Company ID',
      onSelect() {
        navigator.clipboard.writeText(row.original.id)
        toast.add({
          title: 'Company-ID copied to clipboard!',
          color: 'success',
          icon: 'i-lucide-circle-check',
        })
      },
    },
    {
      label: 'Approve Request',
       onSelect() {
        openModal('approve', admin)
      },
    }
  ]
}
const { data: companyDataRequests, refresh: refreshAdminRequestsData, pending } = useGetCompany()
const companyRequests = computed(() => companyDataRequests.value as companyRequestModel | undefined)
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
            Companiees
          </h1>
        </div>
        <div
          v-if="pending"
          class="text-center text-primary text-2xl"
        >
          Pending...
        </div>
        <div class="rounded-lg shadow-xl pb-5" v-else>
          <UTable
            ref="table"
            :data="companyRequests"
            sticky
            :columns="columns"
            class="flex-1 pt-0 max-h-[500px]"
          />
         
        </div>
      </div>
    </div>
    <UModal
      v-model:open="openModel"
      :title="modalTitle"
      :ui="{ footer: 'justify-end' }"
    >
      <template #body>
        <p>{{ modalMessage }}</p>
      </template>
      <template #footer>
        <div class="flex justify-end gap-2">
          <UButton
            color="gray"
            variant="ghost"
            class="bg-gray-500 text-white"
            @click="cancelAction"
          >
            Cancel
          </UButton>
          <UButton
            :class="[modalActionType === 'approve' ? 'bg-green-600 hover:bg-green-800' : 'bg-red-600 hover:bg-red-800']"
            @click="confirmAction"
          >
            Confirm
          </UButton>
        </div>
      </template>
    </UModal>
  </div>
</template>

<style lang="scss" scoped>

</style>
