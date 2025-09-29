<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useApiStore } from '@/stores/api/api'
import { useStateStore } from '@/stores/state'
const api = useApiStore()
const { balans } = storeToRefs(useStateStore())
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
  'Dekabr'
]


onMounted(() => {
  api
    .getAxios({
      url: 'balans/getAll',
    })
    .then((res) => {
      balans.value = { ...res.data }
    })
})
</script>

<template>
  <div v-if="balans._id" class="text-left">
    <div class="font-light">Umumiy balans</div>
    <div class="pt-3">
      <span class="font-semibold text-4xl pr-2">{{ balans.amount.toLocaleString() }}</span>
      <span class="font-light">so'm</span>
    </div>
    <div v-if="balans.thisMonthExpenses">
      <span class="text-sm font-light">{{ `${date[balans.thisMonth]}dagi` }} chiqim {{ balans.thisMonthExpenses.toLocaleString() }} so'm</span>
    </div>
  </div>
  <div v-else class="p-5 text-left">
    <div class="font-light">Umumiy balans</div>
    <div class="pt-3">
      <span class="font-semibold text-4xl pr-2">0</span>
      <span class="font-light">so'm</span>
    </div>
    <div>
      <span class="text-sm font-light">Sentabrdagi chiqim 0 so'm</span>
    </div>
  </div>
</template>
