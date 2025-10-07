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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import ListPayment from './list/listPayment.vue'

import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import { useApiStore } from '@/stores/api/api'
import { useStateStore } from '@/stores/state'

const { clientId, name } = useRoute().params
const date = [
  'Yanvar',
  'Fevral',
  'Mart',
  'Aprel',
  'May',
  'Iyun',
  'Iyul',
  'Avgust',
  'Sentyabr',
  'Oktyabr',
  'Noyabr',
  'Dekabr',
]

const api = useApiStore()
const { ListRentPayment } = storeToRefs(useStateStore())
const state = ref({
  amount: 0,
  title: '',
  text: '',
  debt: false,
  month: new Date().getMonth(),
  year: new Date().getFullYear(),
})

const cancel = () => {
  state.value.amount = 0
  state.value.title = ''
  state.value.text = ''
}
const add = () => {
  console.log(state.value);
  api
    .postAxios({
      url: `rentpayment/create/${clientId}`,
      data: state.value,
    })
    .then((res) => {
      ListRentPayment.value = [res.data, ...ListRentPayment.value]
    })
  state.value.amount = 0
  state.value.title = ''
  state.value.text = ''
  state.value.debt = false 
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
              <AlertDialogTitle>{{ name }} to'lov jadvali</AlertDialogTitle>
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
                <div class="flex">
                  <FormField name="month">
                    <FormItem class="w-6/12 mt-5 pr-2">
                      <FormLabel>Oynni tanlang</FormLabel>
                      <FormControl>
                        <Select v-model="state.month">
                          <SelectTrigger class="w-full">
                            <SelectValue placeholder="Oyni tanlang" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Oylar ro'yxati</SelectLabel>
                              <SelectItem
                                v-for="(item, index) in date"
                                :key="index"
                                :value="index"
                                >{{ item }}</SelectItem
                              >
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  </FormField>
                  <FormField name="year">
                    <FormItem class="w-6/12 mt-5 pl-2">
                      <FormLabel>Yilni kiriting</FormLabel>
                      <FormControl>
                        <Input type="number" autocomplete="off" v-model="state.year" />
                      </FormControl>
                    </FormItem>
                  </FormField>
                </div>
                <div class="mt-5 flex items-center gap-5">
                  <div class=" font-medium text-orange-500">Qarzdorlik !!!</div>
                  <Switch v-model="state.debt" class=" scale-120" />
                </div>
                <FormField name="price">
                  <FormItem class="mt-5">
                    <FormLabel>Summa</FormLabel>
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
