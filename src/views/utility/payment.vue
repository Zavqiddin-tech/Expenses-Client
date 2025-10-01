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
import ListPayment from './list/listPayment.vue'

import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import { useApiStore } from '@/stores/api/api'
import { useStateStore } from '@/stores/state'

const { categoryId, name } = useRoute().params

const api = useApiStore()
const {ListRentPayment} = storeToRefs(useStateStore())

const state = ref({
  amount: 0,
  title: '',
  text: '',
})

const cancel = () => {
  state.value.amount = 0
  state.value.title = ''
  state.value.text = ''
}
const add = () => {
  api
    .postAxios({
      url: `rentpayment/create/${categoryId}`,
      data: state.value,
    })
    .then((res) => {
      ListRentPayment.value = [res.data, ...ListRentPayment.value]
    })
  state.value.amount = 0
  state.value.title = ''
  state.value.text = ''
}
</script>

<template>
  <div>
    <div class="p-4 text-xl font-medium flex justify-between items-center text-white">
      <div class="text-white capitalize">{{ name }}</div>
      <div>
        <AlertDialog>
          <AlertDialogTrigger>
            <Button class="bg-white text-black hover:bg-white/80 cursor-pointer">To'lov</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{{ name }} uchun to'lov</AlertDialogTitle>
              <AlertDialogDescription>
                <FormField name="title">
                  <FormItem class="mt-5">
                    <FormLabel>Sarlavha</FormLabel>
                    <FormControl>
                      <Input type="text" autocomplete="off" v-model="state.title" />
                    </FormControl>
                  </FormItem>
                </FormField>
                <FormField name="text">
                  <FormItem class="mt-5">
                    <FormLabel>Qo'shimcha ma'lumot</FormLabel>
                    <FormControl>
                      <Input type="text" autocomplete="off" v-model="state.text" />
                    </FormControl>
                  </FormItem>
                </FormField>
                <FormField name="price">
                  <FormItem class="mt-5">
                    <FormLabel>To'lov summasi</FormLabel>
                    <FormControl>
                      <Input type="number" autocomplete="off" v-model="state.amount" />
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
                :disabled="state.amount > 0 && state.title ? false : true"
                @click="add"
                >Davom etish</AlertDialogAction
              >
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
    <ListPayment />
  </div>
</template>

<style></style>
