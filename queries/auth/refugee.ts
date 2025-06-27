import { useAPI } from '@@/servises/baseApi'
import type { refugeeModel } from '~/models/refugeeModel'
import type { userModel } from '~/models/userModel'

export const useLoginRefugee = (user: userModel) => {
  return useAPI({ url: '/login2', payload: user, queryKey: 'user', type: 'POST' })
}

export const useSendNeed = (user: refugeeModel) => {
  return useAPI({ url: '/refugees', payload: user, queryKey: 'user', type: 'POST' })
}