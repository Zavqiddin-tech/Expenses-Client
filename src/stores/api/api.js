import { defineStore, storeToRefs } from 'pinia'
import axios from 'axios'
import router from '@/router'
import { useTokenStore } from '../auth/token'
import { useUrlStore } from './url'

export const useApiStore = defineStore('api', () => {
  const { url } = storeToRefs(useUrlStore())
  const tokenStore = useTokenStore()

  const getAxios = (payload) => {
    return axios
      .get(`${url.value}/${payload.url}`, {
        headers: { Authorization: `Bearer ${tokenStore.token}` },
      })
      .catch((e) => {
        if (e.response.status == 401) {
          router.push('/auth')
          return false
        }
      })
  }

  const postAxios = (payload) => {
    return axios
      .post(`${url.value}/${payload.url}`, payload.data, {
        headers: { Authorization: `Bearer ${tokenStore.token}` },
      })
      .catch((e) => {
        if (e.response.status == 401) {
        }
        toast({
          title: 'Ogohlantirish',
          description: e?.response?.data?.message,
        })
      })
  }

  const putAxios = (payload) => {
    return axios
      .put(`${url.value}/${payload.url}`, payload.data, {
        headers: { Authorization: `Bearer ${tokenStore.token}` },
      })
      .catch((e) => {})
  }

  const patchAxios = (payload) => {
    return axios
      .patch(`${url.value}/${payload.url}`, payload.data, {
        headers: { Authorization: `Bearer ${tokenStore.token}` },
      })
      .catch((e) => {})
  }

  const deleteAxios = (payload) => {
    return axios
      .delete(`${url.value}/${payload.url}`, {
        headers: { Authorization: `Bearer ${tokenStore.token}` },
      })
      .catch((e) => {})
  }

  const postFormData = (payload) => {
    return axios
      .post(`${url.value}/${payload.url}`, payload.data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${tokenStore.token}`,
        },
      })
      .catch((e) => {
        if (e.response.status == 401) {
        }
        toast({
          title: 'Ogohlantirish',
          description: e?.response?.data?.message,
        })
      })
  }

  return {
    getAxios,
    postAxios,
    putAxios,
    patchAxios,
    deleteAxios,
    postFormData
  }
})
