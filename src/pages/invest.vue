<script setup>
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import CategoryInvest from '@/views/invest/categoryInvest.vue'

import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useApiStore } from '@/stores/api/api'
import { useStateStore } from '@/stores/state'
const api = useApiStore()
const { invest } = storeToRefs(useStateStore())

const state = ref({
  name: '',
})

const cancel = () => {
  state.value.name = ''
}
const add = () => {
  console.log(state)
  api
    .postAxios({
      url: 'categoryInvest/create',
      data: state.value,
    })
    .then((res) => {
      console.log(res.data)
      invest.value = [...invest.value, res.data]
    })
  state.value.name = ''
}
</script>

<template>
  <div class="p-4 text-xl font-medium flex justify-between items-center text-white">
    <div class="text-sm sm:text-lg text-white">Investitsiya, bo'limlari</div>
    <div>
      <AlertDialog>
        <AlertDialogTrigger>
          <Button class="bg-white text-black hover:bg-white/80 cursor-pointer">Qo'shish</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Investitsiya uchun bo'lim</AlertDialogTitle>
            <AlertDialogDescription>
              <form @submit.prevent="add">
                <FormField name="price">
                  <FormItem class="mt-5">
                    <FormLabel>Nom kiriting</FormLabel>
                    <FormControl>
                      <Input type="text" autocomplete="off" v-model="state.name" />
                    </FormControl>
                  </FormItem>
                </FormField>
              </form>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              class="bg-red-500 text-white hover:bg-red-400 hover:text-white cursor-pointer"
              @click="cancel"
              >Bekor qilish</AlertDialogCancel
            >
            <AlertDialogAction
              class="cursor-pointer"
              :disabled="state.name ? false : true"
              @click="add"
              >Davom etish</AlertDialogAction
            >
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  </div>
  <CategoryInvest />
</template>

<style></style>
