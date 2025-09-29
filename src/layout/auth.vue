<script setup>
import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from 'vue-sonner'

import { ref, reactive } from 'vue'
const toggle = ref(false)
const state = reactive({
  userName: '',
  password: '',
})

import { useAuthStore } from '../stores/auth/auth'
const { login } = useAuthStore()

const add = () => {
  if (!state.userName || !state.password) {
    toast('Ogohlantirish', {
      description: "Iltimos, barcha maydonlarni to'ldiring",
      action: {
        label: 'yopish',
      },
    })
    return
  }
  state.userName = state.userName.trim()
  state.password = state.password.trim()
  login(state)
}
</script>

<template>
  <div class="h-screen flex justify-center items-center">
    <div class="bg-white dark:bg-black w-[350px] rounded-lg border p-8 shadow">
      <div class="pb-6 flex justify-center">
        <div>
          <div class="text-2xl font-medium">Authorization</div>
        </div>
      </div>
      <form @submit.prevent="add">
        <FormField name="userName">
          <FormItem>
            <FormLabel>Username</FormLabel>
            <FormControl>
              <Input type="text" autocomplete="off" v-model="state.userName" />
            </FormControl>

            <FormMessage />
          </FormItem>
        </FormField>
        <FormField name="password">
          <FormItem class="mt-5">
            <FormLabel>Password</FormLabel>
            <FormControl>
              <div class="relative">
                <Input
                  :type="`${toggle ? 'text' : 'password'}`"
                  autocomplete="off"
                  v-model="state.password"
                />
                <div @click="toggle = !toggle" class="absolute right-3 top-2 cursor-pointer">
                  <i class="fa-solid fa-eye" v-if="!toggle"></i>
                  <i class="fa-solid fa-eye-slash" v-if="toggle"></i>
                </div>
              </div>
            </FormControl>

            <FormMessage />
          </FormItem>
        </FormField>
        <div class="flex justify-center">
          <Button type="submit" class="w-full mt-5 cursor-pointer"> Submit </Button>
        </div>
      </form>
    </div>
  </div>
</template>

<style lang="scss"></style>
