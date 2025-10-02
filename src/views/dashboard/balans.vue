<script setup>
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'

import { ref, reactive, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useApiStore } from '@/stores/api/api'
import { useStateStore } from '@/stores/state'
const api = useApiStore()
const { balans } = storeToRefs(useStateStore())
const date = [
  'yanvar',
  'fevral',
  'mart',
  'aprel',
  'may',
  'iyun',
  'iyul',
  'avgust',
  'sentyabr',
  'oktyabr',
  'noyabr',
  'dekabr',
]

const open = ref(false)
const state = reactive({
  date: '',
  choose: false,
})

const add = () => {
  if (!state.date) {
    return
  }
  api
    .getAxios({
      url: `report/choose-date?year=${state.date.year}&month=${state.date.month}&day=${state.date.day}`,
    })
    .then((res) => {
      balans.value.amount = res.data
    })
  state.choose = true
  open.value = false
}

onMounted(() => {
  api
    .getAxios({
      url: 'balans/getAll',
    })
    .then((res) => {
      balans.value = { ...res.data }
    })
  state.choose = false
})
</script>

<template>
  <div class="flex justify-between">
    <div v-if="balans._id" class="text-left">
      <div v-if="state.choose">
        <div class="font-light">
          {{ `${state.date.day}-${date[state.date.month - 1]} ${state.date.year}` }}
        </div>
        <div class="pt-3 text-yellow-300">
          <span class="font-semibold text-4xl pr-2">{{ balans.amount.toLocaleString() }}</span>
          <span class="font-light">so'm</span>
        </div>
      </div>
      <div v-else>
        <div class="font-light">Hozirgi balans</div>
        <div class="pt-3">
          <span class="font-semibold text-4xl pr-2">{{ balans.amount.toLocaleString() }}</span>
          <span class="font-light">so'm</span>
        </div>
        <div v-if="balans.thisMonthExpenses">
          <span class="text-sm font-light"
            >{{ `${date[balans.thisMonth]}dagi` }} chiqim
            {{ balans.thisMonthExpenses.toLocaleString() }} so'm</span
          >
        </div>
      </div>
    </div>
    <div v-else class="p-5 text-left">
      <div class="font-light">Hozirgi balans</div>
      <div class="pt-3">
        <span class="font-semibold text-4xl pr-2">0</span>
        <span class="font-light">so'm</span>
      </div>
      <div>
        <span class="text-sm font-light">Sentabrdagi chiqim 0 so'm</span>
      </div>
    </div>
    <div>
      <Popover v-model:open="open">
        <PopoverTrigger>
          <div><i class="fa-solid fa-ellipsis-vertical text-2xl"></i></div>
        </PopoverTrigger>
        <PopoverContent class="bg-white/30 border-0 backdrop-blur-lg">
          <Calendar v-model="state.date" />
          <Button @click="add" class="mt-5">hisobot olish</Button>
        </PopoverContent>
      </Popover>
    </div>
  </div>
</template>
