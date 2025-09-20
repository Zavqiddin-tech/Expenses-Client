import { defineStore } from 'pinia'
import { useApiStore } from '@/stores/api/api'
import { useTokenStore } from '@/stores/auth/token'
import { useStateStore } from '../state'
import cookies from 'vue-cookies'
import router from '@/router'

export const useAuthStore = defineStore('auth', () => {
  const api = useApiStore()
  const tokenStore = useTokenStore()
  const state = useStateStore()

  const regis = async (data) => {
    await api
      .postAxios({
        url: 'auth/register',
        data,
      })
      .then((res) => {
        console.log(res.data)
      })
  }
  const login = async (data) => {
    console.log(data)
    await api
      .postAxios({
        url: 'auth/login',
        data,
      })
      .then((res) => {
        if (res.data.accessToken) {
          console.log(res.data)
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
        state.user = {...res.data}
      })
  }
  const checkAdmin = async () => {
    if (cookies.isKey('metan-token')) {
      tokenStore.setToken(cookies.get('metan-token'))
    }
    await api
      .getAxios({
        url: 'auth/check-admin',
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
