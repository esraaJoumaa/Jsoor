import { useAPI } from '@@/servises/baseApi'
import type { userModel } from '~/models/userModel'

export const useLoginAdmin = (user: userModel) => {
  return useAPI({ url: '/login1', payload: user, queryKey: 'user', type: 'POST' })
}

export const useGetCompany = () => {
  return useAPI({ url: '/companies',queryKey: 'user', type: 'GET' })
}
