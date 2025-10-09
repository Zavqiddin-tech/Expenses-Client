<script setup>
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import Button from '@/components/ui/button/Button.vue'

import { reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { convertDate } from '@/func/date'
import { storeToRefs } from 'pinia'
import { useApiStore } from '@/stores/api/api'
import { useStateStore } from '@/stores/state'
const api = useApiStore()
const { ListRentPayment } = storeToRefs(useStateStore())

const { clientId } = useRoute().params

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

const state = reactive({
  name: '',
})

onMounted(() => {
  api
    .getAxios({
      url: `rentpayment/getAll/${clientId}`,
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
      class="mb-6 p-2 flex justify-between items-center rounded-lg bg-slate-800/80"
    >
      <div class="flex items-center gap-5 cursor-pointer">
        <div class="pl-2">
          <div class="text-md font-light capitalize text-white">{{ item.title }}</div>
          <div v-if="item.method === 0">
            <div>
              <div class="pt-2 flex items-center gap-1">
                <i class="fa-solid fa-circle-check text-green-400"></i>
                <span class="lowercase font-light text-green-300"
                  >{{ date[item.month] }} {{ item.year }}</span
                >
              </div>
            </div>
            <div class="pt-1 font-medium text-sky-400">
              + {{ item.amount.toLocaleString() }}
              <span class="text-white text-xs font-light">so'm</span>
            </div>
          </div>
          <div v-else>
            <div>
              <div class="pt-2 flex items-center gap-1">
                <i class="fa-solid fa-circle-xmark text-red-400"></i>
                <span class="lowercase font-light text-red-400"
                  >{{ date[item.month] }} {{ item.year }}</span
                >
              </div>
            </div>
            <div class="pt-1 font-medium text-red-400">
              - {{ item.amount.toLocaleString() }}
              <span class="text-white text-xs font-light">so'm</span>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Popover>
          <PopoverTrigger>
            <Button class="text-xl text-white bg-black/50">
              <i class="fa-solid fa-ellipsis"></i>
            </Button>
          </PopoverTrigger>
          <PopoverContent class="bg-black/40 text-white backdrop-blur border-white/30">
            <div v-if="item.text">
              {{ item.text }}
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <div class="text-sm text-[#bec3c8]">
        {{ convertDate(item.createdAt, 1) }}
      </div>
      <div></div>
    </div>
  </div>
</template>
