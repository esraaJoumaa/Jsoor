import { useAPI } from '@@/servises/baseApi'
import type { userModel } from '~/models/userModel'

export const useLoginAdmin = (user: userModel) => {
  return useAPI({ url: '/login1', payload: user, queryKey: 'user', type: 'POST' })
}

export const useGetCompany = () => {
  return useAPI({ url: '/companies',queryKey: 'user', type: 'GET' })
}

export const useUpdateCompanyRequest = (id:string | number) => {
  return useAPI({ url: `/companies/companies/${id}ud/approve`,queryKey: 'companyRequest', type: 'PUT' })
}

export const useGetADS = () => {
  return useAPI({ url: '/ads/pending',queryKey: 'user', type: 'GET' })
}

export const useApproveAdvertismentRequest = (id: string | number) => {
  return useAPI({
    url: `/ads/${id}/approve`,
    type: 'POST',
    queryKey: 'advertisment',
    isLazy: true,
  })
}

export const useRejectAdvertismentRequest = (id: string | number) => {
  return useAPI({
    url: `/ads/${id}/reject`,
    type: 'POST',
    queryKey: 'advertisment',
    isLazy: true,
  })
}