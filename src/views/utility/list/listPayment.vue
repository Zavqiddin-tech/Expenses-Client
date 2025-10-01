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
import router from '@/router'
import { convertDate } from '@/func/date'
import { storeToRefs } from 'pinia'
import { useApiStore } from '@/stores/api/api'
import { useStateStore } from '@/stores/state'
const api = useApiStore()
const { ListRentPayment } = storeToRefs(useStateStore())

const { categoryId } = useRoute().params

const state = reactive({
  name: '',
})

const update = (id) => {
  api
    .patchAxios({
      url: `rentpayment/${id}`,
      data: state,
    })
    .then((res) => {
      /* invest.value = invest.value.map((e) => {
        if (e._id == res.data._id) {
          return res.data
        } else {
          return e
        }
      }) */
    })
}

onMounted(() => {
  api
    .getAxios({
      url: `rentpayment/getAll/${categoryId}`,
    })
    .then((res) => {
      ListRentPayment.value = [...res.data]
    })
})
</script>

<template>
  <div v-if="Array.isArray(ListRentPayment) && ListRentPayment.length > 0" class="pt-5">
    <div
      v-for="item in ListRentPayment"
      class="mb-6 p-2 flex justify-between items-center rounded-lg bg-slate-800"
    >
      <div class="flex items-center gap-5 cursor-pointer">
        <div class="w-10 h-10 bg-white/20 rounded-xl flex justify-center items-center">
          <i class="fa-solid fa-money-bill-transfer text-xl text-green-400"></i>
        </div>
        <div>
          <div class="text-md font-light capitalize text-white">{{ item.title }}</div>
          <div class="pt-1 font-medium text-green-400">
            + {{ item.amount.toLocaleString() }}
            <span class="text-white text-xs font-light">so'm</span>
          </div>
        </div>
      </div>
      <div class="text-sm text-[#bec3c8]">
        {{ convertDate(item.createdAt, 1) }}
      </div>
      <div>
    
      </div>
    </div>
  </div>
</template>
