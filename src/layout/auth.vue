<script setup>
import { reactive } from 'vue'
const state = reactive({
	userName: '',
	password: ''
})
//store
import { useAuthStore } from '../stores/auth/auth'
const { login } = useAuthStore()

//shadcn ui
import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const add = () => {
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
              <Input type="text" autocomplete="off"  v-model="state.userName"/>
            </FormControl>

            <FormMessage />
          </FormItem>
        </FormField>
        <FormField name="password">
          <FormItem class="mt-5">
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input type="password" autocomplete="off" v-model="state.password"/>
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
