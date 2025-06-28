<script setup lang="ts">
import type { companyModel } from '~/models/companyModel';
import { useApproveAdvertismentRequest, useGetADS, useGetCompany, useRejectAdvertismentRequest } from '~/queries/auth/admin';
import type { TableColumn } from '@nuxt/ui'
import type { adsRequstModel } from '~/models/adsRequstModel';

const columns: TableColumn<companyModel>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => `${row.getValue('id')}`,
  },
   {
    accessorKey: 'company_id',
    header: 'Company Id',
    cell: ({ row }) => `${row.getValue('company_id')}`,
  },
   {
    accessorKey: 'service_id',
    header: 'Service Id',
    cell: ({ row }) => `${row.getValue('service_id')}`,
  },
   {
    accessorKey: 'title',
    header: 'Title',
    cell: ({ row }) => `${row.getValue('title')}`,
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
    accessorKey: 'start_date',
    header: 'Start Date',
    cell: ({ row }) => `${row.getValue('start_date')}`,
  },
   {
    accessorKey: 'end_date',
    header: 'End Date',
    cell: ({ row }) => `${row.getValue('end_date')}`,
  },
   {
    accessorKey: 'meet_link',
    header: 'Meet Link',
    cell: ({ row }) => `${row.getValue('meet_link')}`,
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
const selectedAdmin = ref<adsRequstModel | null>(null)
const modalActionType = ref<'approve' | 'reject' | null>(null)

const route = useRoute()

const UButton = resolveComponent('UButton')
const UDropdownMenu = resolveComponent('UDropdownMenu')


const toast = useToast()

function openModal(action: 'approve' | 'reject', admin: adsRequstModel) {
  selectedAdmin.value = admin
  modalActionType.value = action
  modalTitle.value = `${action === 'approve' ? 'Approve' : 'Reject'} Request for ${admin.title}`
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
      successMessage = `Advertisment Approved Successfully ${selectedAdmin.value.title}`
      const { execute, clear } = useApproveAdvertismentRequest(adminId)
      refreshAdminRequestsData()
      clear()
      apiResponse = await execute()
    }
    else {
      successMessage = `Advertisment Rejected Successfully ${selectedAdmin.value.title}`
      const { execute, clear } = useRejectAdvertismentRequest(adminId)
      apiResponse = await execute()
      clear()
      refreshAdminRequestsData()
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
function getRowItems(row: Row<adsRequstModel>) {
  const admin = row.original

  return [
    {
      label: 'Copy Advertisment ID',
      onSelect() {
        navigator.clipboard.writeText(row.original.id)
        toast.add({
          title: 'Advertisment-ID copied to clipboard!',
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
    },
     {
      label: 'Reject Request',
      onSelect() {
        openModal('reject', admin)
      },
    },
  ]
}
const { data: advertismentDataRequests, refresh: refreshAdminRequestsData, pending, clear } = useGetADS()
const advertismentRequests = computed(() => advertismentDataRequests.value as adsRequstModel | undefined)
clear()
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
            Advertisments
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
            :data="advertismentRequests"
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
