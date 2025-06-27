import { useAPI } from '@@/servises/baseApi'
import type { userModel } from '~/models/userModel'

export const useRegisterUser = (user: userModel) => {
  return useAPI({ url: '/register', payload: user, queryKey: 'user', type: 'POST' })
}