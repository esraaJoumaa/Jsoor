import { refreshNuxtData, useFetch } from 'nuxt/app'
import type { Ref } from 'vue'
import { useGlobalStore } from '~/stors/global'

export function useAPI<T>(
    options: {
        url: string,
        payload?: object,
        queryKey: string,
        isLazy?: boolean
        params?: { skip: Ref<number>, limit: Ref<number> }
        type: ('DELETE' | 'GET' | 'POST' | 'PUT')
    },
) {
    return useFetch(options.url, {
        $fetch: api,
        body: options.payload,
        params: { ...options.params },
        method: options.type,
        watch: false,
        onResponse: async () => await refreshNuxtData(options.queryKey),
    })
}
export const api = $fetch.create({
    baseURL: 'http://127.0.0.1:8000/api',
    onRequest({ options }) {
        options.headers.set('Content-Type', 'application/json')
        options.headers.set('Authorization', `Bearer ${useGlobalStore().token}`)
    },
},
)
