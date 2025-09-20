import { defineStore, storeToRefs } from 'pinia'
import axios from 'axios'
import { toast } from 'vue-sonner'
import router from '@/router'
import { useTokenStore } from '@/stores/auth/token'
import { useUrlStore } from '@/stores/api/url'

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
          toast('Boshqatdan kiring', {
            description: e?.response?.data?.message,
            action: {
              label: 'yopish',
              onClick: () => console.log('Undo'),
            },
          })
          return false
        }
        toast('Xatolik', {
          description: e?.response?.data?.message,
          action: {
            label: 'yopish',
            onClick: () => console.log('Undo'),
          },
        })
      })
  }

  const postAxios = (payload) => {
    console.log(payload)
    return axios
      .post(`${url.value}/${payload.url}`, payload.data, {
        headers: { Authorization: `Bearer ${tokenStore.token}` },
      })
      .catch((e) => {
        if (e.response.status == 401) {
          router.push('/auth')
          toast('Boshqatdan kiring', {
            description: e?.response?.data?.message,
            action: {
              label: 'yopish',
              onClick: () => console.log('Undo'),
            },
          })
          return false
        }
        toast(e?.response?.data?.message, {
          description: "tekshirib ko'ring",
          action: {
            label: 'yopish',
            onClick: () => console.log('Undo'),
          },
        })
      })
  }

  const putAxios = (payload) => {
    return axios
      .put(`${url.value}/${payload.url}`, payload.data, {
        headers: { Authorization: `Bearer ${tokenStore.token}` },
      })
      .catch((e) => {
        if (e.response.status == 401) {
          router.push('/auth')
          toast('Boshqatdan kiring', {
            description: e?.response?.data?.message,
            action: {
              label: 'yopish',
              onClick: () => console.log('Undo'),
            },
          })
          return false
        }
        toast('Xatolik', {
          description: e?.response?.data?.message,
          action: {
            label: 'yopish',
            onClick: () => console.log('Undo'),
          },
        })
      })
  }

  const patchAxios = (payload) => {
    return axios
      .patch(`${url.value}/${payload.url}`, payload.data, {
        headers: { Authorization: `Bearer ${tokenStore.token}` },
      })
      .catch((e) => {
        if (e.response.status == 401) {
          router.push('/auth')
          toast('Boshqatdan kiring', {
            description: e?.response?.data?.message,
            action: {
              label: 'yopish',
              onClick: () => console.log('Undo'),
            },
          })
          return false
        }
        toast('Xatolik', {
          description: e?.response?.data?.message,
          action: {
            label: 'yopish',
            onClick: () => console.log('Undo'),
          },
        })
      })
  }

  const deleteAxios = (payload) => {
    return axios
      .delete(`${url.value}/${payload.url}`, {
        headers: { Authorization: `Bearer ${tokenStore.token}` },
      })
      .catch((e) => {
        if (e.response.status == 401) {
          router.push('/auth')
          toast('Boshqatdan kiring', {
            description: e?.response?.data?.message,
            action: {
              label: 'yopish',
              onClick: () => console.log('Undo'),
            },
          })
          return false
        }
        toast('Xatolik', {
          description: e?.response?.data?.message,
          action: {
            label: 'yopish',
            onClick: () => console.log('Undo'),
          },
        })
      })
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
          router.push('/auth')
          toast('Boshqatdan kiring', {
            description: e?.response?.data?.message,
            action: {
              label: 'yopish',
              onClick: () => console.log('Undo'),
            },
          })
          return false
        }
        toast('Xatolik', {
          description: e?.response?.data?.message,
          action: {
            label: 'yopish',
            onClick: () => console.log('Undo'),
          },
        })
      })
  }

  return {
    getAxios,
    postAxios,
    putAxios,
    patchAxios,
    deleteAxios,
    postFormData,
  }
})
