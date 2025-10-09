<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { convertDate } from '@/func/date'
import { useApiStore } from '@/stores/api/api'
import { useUrlStore } from '@/stores/api/url'
import { useStateStore } from '@/stores/state'
const api = useApiStore()
const { urlImg } = storeToRefs(useUrlStore())
const { expenses } = storeToRefs(useStateStore())



onMounted(() => {
  api
    .getAxios({
      url: 'expenses/getAll',
    })
    .then((res) => {
      expenses.value = [...res.data]
    })
})
</script>

<template>
  <div v-if="Array.isArray(expenses) && expenses.length > 0" class="pt-5">
    <div
      v-for="item in expenses"
      class="mb-6 p-2 flex justify-between items-center rounded-lg bg-slate-800"
    >
      <div class="flex items-center gap-5">
        <div
          v-if="item.picture.length > 0"
          class="w-10 h-10 rounded-xl flex justify-center items-center overflow-hidden"
        >
          <img class="w-full h-full object-cover" :src="`${urlImg}/${item.picture[0]}`" alt="image" />
        </div>
        
        <div v-else class="w-10 h-10 bg-white/20 rounded-xl flex justify-center items-center">
          <i class="fa-solid fa-tags text-2xl text-sky-400"></i>
        </div>
        <div>
          <div class="text-sm font-light">{{ item.title }}</div>
          <div class="pt-1 font-medium text-red-400">
            -{{ item.pay.amount.toLocaleString() }}
            <span class="text-white text-xs font-light">so'm</span>
          </div>
        </div>
      </div>
      <div class="text-sm text-[#bec3c8]">{{ convertDate(item.createdAt) }}</div>
    </div>
  </div>
</template>
