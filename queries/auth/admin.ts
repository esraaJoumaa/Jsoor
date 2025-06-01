import { useAPI } from '@@/servises/baseApi'
import type { userModel } from '~/models/userModel'

export const useLoginAdmin = (user: userModel) => {
  return useAPI({ url: '/login', payload: user, queryKey: 'user', type: 'POST' })
}
