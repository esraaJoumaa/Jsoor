import { useAPI } from '@@/servises/baseApi'
import type { userModel } from '~/models/userModel'

export const useLoginAdmin = (user: userModel) => {
  return useAPI({ url: '/login', payload: user, queryKey: 'user', type: 'POST' })
}

export const useRegister = (user: userModel) => {
  return useAPI({ url: '/register', payload: user, queryKey: 'user', type: 'POST' })
}

export const useRegugee = (user: userModel) => {
  return useAPI({ url: '/refugees', payload: user, queryKey: 'user', type: 'POST' })
}