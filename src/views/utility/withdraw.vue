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

import { useApiStore } from '@/stores/api/api'
import { useStateStore } from '@/stores/state'
const api = useApiStore()
const { balans } = storeToRefs(useStateStore())

import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import router from '@/router'
const state = ref({
  text: '',
  amount: '',
})

const cancel = () => {
  state.value.text = ''
  state.value.amount = ''
}

const add = () => {
  api
    .postAxios({
      url: 'rentwithdraw/create',
      data: state.value,
    })
    .then((res) => {
      balans.value.amount -= res.data.amount
    })

  state.value.text = ''
  state.value.amount = ''
}
</script>

<template>
  <div class="mt-5 flex justify-center gap-5">
    <AlertDialog>
      <AlertDialogTrigger>
        <div class="flex items-center flex-col">
          <div class="w-12 h-12 flex justify-center items-center bg-white/20 rounded-full">
            <i class="fa-solid fa-reply text-lg"></i>
          </div>
          <span class="pt-1 text-sm">pul chiqarish</span>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Kommunalni pulini olish !</AlertDialogTitle>
          <AlertDialogDescription>
            <FormField name="text">
              <FormItem class="mt-5">
                <FormLabel>Necha pul</FormLabel>
                <FormControl>
                  <Input type="number" autocomplete="off" v-model="state.amount" />
                </FormControl>
              </FormItem>
            </FormField>
            <FormField name="text">
              <FormItem class="mt-5">
                <FormLabel>Ma'lumot</FormLabel>
                <FormControl>
                  <Input type="text" autocomplete="off" v-model="state.text" />
                </FormControl>
              </FormItem>
            </FormField>
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
            :disabled="state.amount > 0 && state.text ? false : true"
            @click="add"
            >Davom etish</AlertDialogAction
          >
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>

    <div @click="router.push('utility/listwithdraw')" class="flex items-center flex-col">
      <div class="w-12 h-12 flex justify-center items-center bg-white/20 rounded-full">
        <i class="fa-solid fa-clipboard-list text-lg"></i>
      </div>
      <span class="pt-1 text-sm">hisobotlar</span>
    </div>
  </div>
</template>
