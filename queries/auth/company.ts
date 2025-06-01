import { useAPI } from '@@/servises/baseApi'
import type { companyModel } from '~/models/companyModel'

export const useloginCompany = (company: companyModel) => {
  return useAPI({ url: '/login', payload: company, queryKey: 'company', type: 'POST' })
}
