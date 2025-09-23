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
import { useStateStore } from '@/stores/state'

const { id } = useRoute().params
const api = useApiStore()
const { oneInvest } = storeToRefs(useStateStore())

const state = reactive({
  text: '',
  amount: 0,
})
const parse = (text, amount) => {
  state.text = text
  state.amount = amount
}

const update = (payId) => {
  api
    .patchAxios({
      url: `invest/${id}/${payId}`,
      data: state,
    })
    .then((res) => {
      oneInvest.value = oneInvest.value.map((e) => {
        if (e._id == res.data._id) {
          return res.data
        } else {
          return e
        }
      })
    })
    state.amount = 0
    state.text = ""
}

onMounted(() => {
  api
    .getAxios({
      url: `categoryInvest/getOne/${id}`,
    })
    .then((res) => {
      oneInvest.value = [...res.data.history]
    })
})
</script>

<template>
  <div class="text-white"></div>
  <div v-if="Array.isArray(oneInvest) && oneInvest.length > 0" class="pt-5">
    <div
      v-for="item in oneInvest"
      class="mb-6 p-2 flex justify-between items-center rounded-lg bg-slate-800"
    >
      <div class="flex items-center gap-5 cursor-pointer">
        <div class="w-10 h-10 bg-white/20 rounded-xl flex justify-center items-center">
          <i class="fa-solid fa-circle-check text-2xl text-green-400"></i>
        </div>
        <div>
          <div class="text-sm font-light text-white">{{ item.text }}</div>
          <div class="pt-1 font-medium text-green-400">
            + {{ item.amount.toLocaleString() }}
            <span class="text-white text-xs font-light">so'm</span>
          </div>
        </div>
      </div>
      <div class="text-sm text-[#bec3c8]">{{ convertDate(item.createdAt) }}</div>
      <div>
        <AlertDialog>
          <AlertDialogTrigger>
            <i
              @click="parse(item.text, item.amount)"
              class="fa-solid fa-pen-to-square text-xl text-white cursor-pointer"
            ></i>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Investitsiya, yangilash</AlertDialogTitle>
              <AlertDialogDescription>
                <form @submit.prevent="update(item._id)">
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
                @click="update(item._id)"
                >Davom etish</AlertDialogAction
              >
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  </div>
</template>
