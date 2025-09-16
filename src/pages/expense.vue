<script setup>
import { reactive, ref, onMounted } from 'vue'
import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

import { useApiStore } from '@/stores/api/api'
const api = useApiStore()

const state = reactive({
  title: '',
  body: '',
  category: '',
  amount: 0,
})
const category = ref([])
const images = reactive([])

const formData = new FormData()
const handleFiles = (event) => {
  for (let file of event.target.files) {
    formData.append('pictures', file)
    images.push(URL.createObjectURL(file))
  }
}
const add = () => {
  console.log(state)
  return
  formData.append('title', state.title)
  formData.append('body', state.body)

  api
    .postFormData({
      url: 'post/create',
      data: formData,
    })
    .then((res) => {
      console.log(res)
    })
  formData.delete('title')
  formData.delete('body')
  formData.delete('pictures')
}
onMounted(() => {
  api
    .getAxios({
      url: 'category/get-all',
    })
    .then((res) => {
      category.value = [...res.data]
    })
})
</script>

<template>
  <div class="p-8 text-white">
    <div class="text-center text-lg font-semibold">To'lovlar</div>
    <form @submit.prevent="add">
      <FormField name="title">
        <FormItem>
          <FormLabel>Nima uchun</FormLabel>
          <FormControl>
            <Input type="text" autocomplete="off" v-model="state.title" />
          </FormControl>
        </FormItem>
      </FormField>
      <FormField name="body">
        <FormItem class="mt-5">
          <FormLabel>To'liqroq</FormLabel>
          <FormControl>
            <Input type="text" autocomplete="off" v-model="state.body" />
          </FormControl>
        </FormItem>
      </FormField>
      <FormField name="category">
        <FormItem class="mt-5">
          <FormLabel>Kategoriya</FormLabel>
          <FormControl>
            <Select v-model="state.category">
              <SelectTrigger class="w-full">
                <SelectValue placeholder="Kategoriya" />
              </SelectTrigger>
              <SelectContent class="bg-black/40 text-white backdrop-blur border-white/30">
                <SelectGroup v-if="Array.isArray(category) && category.length > 0">
                  <SelectItem v-for="item in category" :value="item._id">
                    {{ item.name }}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
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
              <div class="p-3 border-2 border-dotted border-sky-300 rounded-xl cursor-pointer">
                Rasm yuklash
              </div>
            </Label>
            <Input id="picture" type="file" multiple @change="handleFiles" class="hidden" />
          </FormControl>
        </FormItem>
      </FormField>
      <div class="flex justify-center">
        <Button
          type="submit"
          class="w-full mt-5 bg-white text-black cursor-pointer hover:text-black hover:bg-white/60"
        >
          Yuborish
        </Button>
      </div>
    </form>
  </div>
</template>

<style></style>
