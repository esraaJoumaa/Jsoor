import { useAPI } from '@@/servises/baseApi'
import type { companyModel } from '~/models/companyModel'


export const useRegisterCompany = (company: companyModel) => {
  return useAPI({ url: '/companies', payload: company, queryKey: 'company', type: 'POST' })
}
