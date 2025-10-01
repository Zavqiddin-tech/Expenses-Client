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
import TranzaksiyaInvest from './tranzaksiyaInvest.vue'

import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useApiStore } from '@/stores/api/api'
import { useStateStore } from '@/stores/state'
const api = useApiStore()
const { oneInvest } = storeToRefs(useStateStore())

const { id } = useRoute().params
const name = ref('')
const state = ref({})

const cancel = () => {
  state.value.amount = ''
  state.value.text = ''
}
const add = () => {
  api
    .postAxios({
      url: `invest/create/${id}`,
      data: {...state.value}
    })
    .then((res) => {
      oneInvest.value = [res.data.pay, ...oneInvest.value]
    })
  state.value.amount = ''
  state.value.text = ''
}
onMounted(() => {
  api
    .getAxios({
      url: `categoryInvest/getOne/${id}`,
    })
    .then((res) => {
      name.value = res.data.name
    })
})
</script>

<template>
  <div class="p-4 text-xl font-medium flex justify-between items-center text-white">
    <div class=" capitalize text-white">{{ name }}</div>
    <div>
      <AlertDialog>
        <AlertDialogTrigger>
          <Button class="bg-white text-black hover:bg-white/80 cursor-pointer">Qo'shish</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Investitsiya qilish</AlertDialogTitle>
            <AlertDialogDescription>
              <form @submit.prevent="add">
                <FormField name="price">
                  <FormItem class="mt-5">
                    <FormLabel>Necha pul</FormLabel>
                    <FormControl>
                      <Input type="number" autocomplete="off" v-model="state.amount" />
                    </FormControl>
                  </FormItem>
                </FormField>
                <FormField name="price">
                  <FormItem class="mt-5">
                    <FormLabel>Ma'lumot</FormLabel>
                    <FormControl>
                      <Input type="text" autocomplete="off" v-model="state.text" />
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
              :disabled="state.amount && state.text ? false : true"
              @click="add"
              >Davom etish</AlertDialogAction
            >
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  </div>
  <TranzaksiyaInvest />
</template>

<style></style>
