import { defineStore } from 'pinia'
import { useApiStore } from '@/stores/api/api'
import { useTokenStore } from '@/stores/auth/token'
import { useStateStore } from '../state'
import { storeToRefs } from 'pinia'
import cookies from 'vue-cookies'
import router from '@/router'

export const useAuthStore = defineStore('auth', () => {
  const api = useApiStore()
  const tokenStore = useTokenStore()
  const {user} = storeToRefs(useStateStore())

  const regis = async (data) => {
    await api
      .postAxios({
        url: 'auth/register',
        data,
      })
      .then((res) => {
      })
  }
  const login = async (data) => {
    await api
      .postAxios({
        url: 'auth/login',
        data,
      })
      .then((res) => {
        if (res.data.accessToken) {
          tokenStore.setToken(res.data.accessToken)
          router.push('/dashboard')
        }
      })
  }

  const checkUser = async () => {
    if (cookies.isKey('metan-token')) {
      tokenStore.setToken(cookies.get('metan-token'))
    }
    await api
      .getAxios({
        url: 'auth/checkuser',
      })
      .then((res) => {
        user.value = { ...res.data }
      })
  }
  const checkAdmin = async () => {
    if (cookies.isKey('metan-token')) {
      tokenStore.setToken(cookies.get('metan-token'))
    }
    await api
      .getAxios({
        url: 'auth/checkadmin',
      })
      .then((res) => {})
  }

  return {
    regis,
    login,
    checkUser,
    checkAdmin,
  }
})
