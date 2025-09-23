<script setup>
import { onMounted } from 'vue'
import router from '@/router'
import { convertDate } from '@/func/date'
import { storeToRefs } from 'pinia'
import { useApiStore } from '@/stores/api/api'
import { useStateStore } from '@/stores/state'
const api = useApiStore()
const { departmentExpenses } = storeToRefs(useStateStore())

onMounted(() => {
  api
    .getAxios({
      url: 'departmentExpenses/getAll',
    })
    .then((res) => {
      departmentExpenses.value = [...res.data]
    })
})
</script>

<template>
  <div v-if="Array.isArray(departmentExpenses) && departmentExpenses.length > 0" class="pt-5">
    <div
      v-for="item in departmentExpenses"
      class="mb-6 p-2 flex justify-between items-center rounded-lg bg-slate-800"
    >
      <div class="flex items-center gap-5 cursor-pointer" @click="router.push(`/expenses/${item._id}/${item.name}`)">
        <div class="w-10 h-10 bg-white/20 rounded-xl flex justify-center items-center">
          <i class="fa-solid fa-link text-xl text-yellow-400"></i>
        </div>
        <div>
          <div class="text-md font-light capitalize text-white">{{ item.name }}</div>
          <div class="pt-1 font-medium text-yellow-400">
            - {{ item.amount.toLocaleString() }}
            <span class="text-white text-xs font-light">so'm</span>
          </div>
        </div>
      </div>
      <div class="text-sm text-[#bec3c8]">{{ convertDate(item.createdAt) }}</div>
    </div>
  </div>
</template>
