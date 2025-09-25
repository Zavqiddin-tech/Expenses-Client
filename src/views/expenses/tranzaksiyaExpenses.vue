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

import { reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { convertDate } from '@/func/date'
import { storeToRefs } from 'pinia'
import { useApiStore } from '@/stores/api/api'
import { useUrlStore } from '@/stores/api/url'
import { useStateStore } from '@/stores/state'

const { categoryId } = useRoute().params

const api = useApiStore()
const { user, expenses } = storeToRefs(useStateStore())
const { urlImg } = storeToRefs(useUrlStore())

const state = reactive({
  title: '',
  body: '',
  pictures: [],
  amount: 0,
})
const parse = (data) => {
  state.title = data.title
  state.body = data.body
  state.amount = data.pay.amount
}

const update = (id) => {
  api
    .patchAxios({
      url: `expenses/${id}`,
      data: state,
    })
    .then((res) => {
      expenses.value = expenses.value.map((e) => {
        if (e._id == res.data._id) {
          return res.data
        } else {
          return e
        }
      })
    })
  state.amount = 0
  state.text = ''
}

const deleteItem = (id) => {
  api.deleteAxios({ url: `expenses/${id}` }).then((res) => {
    expenses.value = expenses.value.filter((e) => e._id !== res.data._id)
  })
}

onMounted(() => {
  api
    .getAxios({
      url: `expenses/getByCategory/${categoryId}`,
    })
    .then((res) => {
      expenses.value = [...res.data]
    })
})
</script>

<template>
  <div class="text-white"></div>
  <div v-if="Array.isArray(expenses) && expenses.length > 0" class="pt-5">
    <div
      v-for="item in expenses"
      class="mb-6 p-2 flex justify-between items-center rounded-lg bg-slate-800"
    >
      <div class="flex items-center gap-5 cursor-pointer">
        <div
          v-if="item.picture.length > 0"
          class="w-10 h-10 rounded-xl flex justify-center items-center overflow-hidden"
        >
          <img
            class="w-full h-full object-cover"
            :src="`${urlImg}/${item.picture[0]}`"
            alt="image"
          />
        </div>
        <div v-else class="w-10 h-10 bg-white/20 rounded-xl flex justify-center items-center">
          <i class="fa-solid fa-tags text-2xl text-sky-400"></i>
        </div>
        <div>
          <div class="text-sm font-light text-white">{{ item.title }}</div>
          <div class="pt-1 font-medium text-red-400">
            - {{ item.pay.amount.toLocaleString() }}
            <span class="text-white text-xs font-light">so'm</span>
          </div>
        </div>
      </div>
      <div class="text-sm text-[#bec3c8]">{{ convertDate(item.createdAt) }}</div>
      <div v-if="user.role === 'admin'">
        <AlertDialog>
          <AlertDialogTrigger>
            <i
              @click="parse(item)"
              class="fa-solid fa-pen-to-square text-xl text-white cursor-pointer"
            ></i>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Xarajat, yangilash</AlertDialogTitle>
              <AlertDialogDescription>
                <form @submit.prevent="update(item._id)">
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
                  <!-- <FormField name="picture">
                  <div class="pt-3 flex gap-5 flex-wrap">
                    <img
                      v-for="(image, index) in state.images"
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
                      <Input
                        id="picture"
                        type="file"
                        multiple
                        @change="handleFiles"
                        class="hidden"
                      />
                    </FormControl>
                  </FormItem>
                </FormField>  -->
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
                :disabled="state.title && state.amount ? false : true"
                @click="update(item._id)"
                >Davom etish</AlertDialogAction
              >
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <AlertDialog>
          <AlertDialogTrigger>
            <i class="fa-solid fa-trash text-xl text-red-500 cursor-pointer"></i>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Bu ma'lumotni o'chirib yubormoqchimisiz?</AlertDialogTitle>
              <AlertDialogDescription>
                Bu harakatni bekor qilib bo'lmaydi. Bu sizning hisobingizni doimiy ravishda o'chirib
                tashlaydi va ma'lumotlaringizni bizning serverlarimizdan olib tashlaydi.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Bekor qilish</AlertDialogCancel>
              <AlertDialogAction @click="deleteItem(item._id)">Davom etish</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  </div>
</template>
