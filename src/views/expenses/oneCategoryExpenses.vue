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
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import { reactive } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useApiStore } from '@/stores/api/api'
import { useStateStore } from '@/stores/state'
import TranzaksiyaExpenses from './tranzaksiyaExpenses.vue'
const api = useApiStore()
const { expenses } = storeToRefs(useStateStore())

const state = reactive({
  title: '',
  body: '',
  pictures: [],
  amount: 0,
})
const images = reactive([])
const handleFiles = (event) => {
  for (let file of event.target.files) {
    state.pictures.push(file)
    images.push(URL.createObjectURL(file))
  }
}
const { categoryId, name } = useRoute().params

let formData = new FormData()
const cancel = () => {
  formData = new FormData()
  state.title = ''
  state.body = ''
  state.pictures = []
  state.amount = 0
}
const add = () => {
  formData = new FormData()
  for (let img of state.pictures) {
    formData.append('pictures', img)
  }
  formData.append('title', state.title)
  formData.append('body', state.body)
  formData.append('amount', state.amount)
  api
    .postFormData({
      url: `expenses/create/${categoryId}`,
      data: formData,
    })
    .then((res) => {
      expenses.value = [res.data, ...expenses.value]
    })
  state.title = ''
  state.body = ''
  state.pictures = []
  state.amount = 0
  formData.delete('title')
  formData.delete('body')
  formData.delete('amount')
  formData.delete('pictures')
}
</script>

<template>
  <div class="p-4 text-xl font-medium flex justify-between items-center text-white">
    <div class="text-white">{{ name }}, xarajatlar</div>
    <div>
      <AlertDialog>
        <AlertDialogTrigger>
          <Button class="bg-white text-black hover:bg-white/80 cursor-pointer">Qo'shish</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xarajat haqida</AlertDialogTitle>
            <AlertDialogDescription>
              <FormField name="title">
                <FormItem class="mt-5">
                  <FormLabel>Nom kiriting</FormLabel>
                  <FormControl>
                    <Input type="text" autocomplete="off" v-model="state.title" />
                  </FormControl>
                </FormItem>
              </FormField>
              <FormField name="body">
                <FormItem class="mt-5">
                  <FormLabel>To'liqroq ma'lumot</FormLabel>
                  <FormControl>
                    <Input type="text" autocomplete="off" v-model="state.body" />
                  </FormControl>
                </FormItem>
              </FormField>
              <FormField name="price">
                <FormItem class="mt-5">
                  <FormLabel>Narxi</FormLabel>
                  <FormControl>
                    <Input type="number" autocomplete="off" v-model="state.amount" />
                  </FormControl>
                </FormItem>
              </FormField>
              <FormField name="picture">
                <div class="pt-3 flex gap-5 flex-wrap">
                  <img
                    v-for="(image, index) in images"
                    :key="index"
                    :src="image"
                    alt="Preview Image"
                    class="w-30 h-30 mt-5 object-cover rounded-2xl shadow-xl shadow-sky-300/50"
                  />
                </div>
                <FormItem class="mt-5">
                  <FormControl>
                    <Label for="picture" class="w-35">
                      <div
                        class="p-3 border-2 border-dotted border-sky-300 rounded-xl cursor-pointer"
                      >
                        Rasm yuklash
                      </div>
                    </Label>
                    <Input id="picture" type="file" multiple @change="handleFiles" class="hidden" />
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
              :disabled="state.title && state.amount ? false : true"
              @click="add"
              >Davom etish</AlertDialogAction
            >
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  </div>
  <TranzaksiyaExpenses />
</template>

<style></style>
