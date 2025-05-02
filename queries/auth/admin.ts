import { useAPI } from "~/servises/baseApi"

export const useLoginAdmin = (user) => {
  return useAPI({ url: '/login', payload: user, queryKey: 'user', type: 'POST' })
}
