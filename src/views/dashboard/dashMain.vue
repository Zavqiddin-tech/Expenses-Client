<script setup>
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import ProgressBar from '@/components/layout/ui/ProgressBar.vue'
const date = new Date()
const year = date.getFullYear()
const month = date.getMonth()

import { useApiStore } from '@/stores/api/api'
import { useStateStore } from '@/stores/state'
const api = useApiStore()
const { balans } = storeToRefs(useStateStore())

const data = ref(0)
const money = ref({ kirim: 0, chiqim: 0 })
onMounted(() => {
  api
    .getAxios({
      url: `report/this-month?year=${year}&month=${month}`,
    })
    .then((res) => {
      money.value = res.data
      balans.value.thisMonthExpenses = res.data.chiqim
      balans.value.thisMonth = month
    })
  api
    .getAxios({
      url: 'report/percent',
    })
    .then((res) => {
      data.value = res.data
    })
})
</script>

<template>
  <div class="flex items-stretch flex-wrap -ml-2 -mr-2">
    <div class="w-6/12 p-2 lg:w-4/12">
      <div class="h-full p-5 rounded-2xl bg-white/20 backdrop-blur-xs">
        <div class="w-12 h-12 flex justify-center items-center rounded-full bg-black/30">
          <i class="fa-solid fa-seedling text-xl"></i>
        </div>
        <div class="pt-2 pb-3 text-lg font-extralight">Sarmoya</div>
        <div class="text-xl font-medium">
          {{ money.kirim.toLocaleString() }} <span class="text-sm font-light">so'm</span>
        </div>
      </div>
    </div>
    <div class="w-6/12 p-2 lg:w-4/12">
      <div class="h-full p-5 rounded-2xl bg-white/20 backdrop-blur-xs">
        <div class="w-12 h-12 flex justify-center items-center rounded-full bg-black/30">
          <i class="fa-solid fa-money-bill-trend-up text-xl"></i>
        </div>
        <div class="pt-2 pb-3 text-lg font-extralight">Xarajat</div>
        <div class="text-xl font-medium">
          {{ money.chiqim.toLocaleString() }} <span class="text-sm font-light">so'm</span>
        </div>
      </div>
    </div>
    <div class="w-full p-2 lg:w-4/12">
      <div v-if="data >= 0" class="h-full rounded-2xl bg-white/20 backdrop-blur-xs">
        <ProgressBar :progress="data" />
      </div>
      <div v-else class="h-full rounded-2xl bg-white/20 backdrop-blur-xs">
        <ProgressBar :progress="0" />
      </div>
    </div>
  </div>
</template>
