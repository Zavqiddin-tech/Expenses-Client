<script setup>
import { ref, onMounted } from 'vue'
import router from '@/router'
import { useApiStore } from '@/stores/api/api'
const api = useApiStore()

const state = ref([])

onMounted(() => {
  api
    .getAxios({
      url: 'rentClient/getAll',
    })
    .then((res) => {
      state.value = [...res.data]
    })
})
</script>

<template>
  <div>
    <div class="mt-10 pb-2 text-lg">Mijozlar</div>
    <div v-if="Array.isArray(state) && state.length > 0" class="flex flex-wrap -ml-3 -mr-3">
      <div v-for="item in state" :key="item._id" class="w-6/12 p-3">
        <div
          @click="router.push(`utility/client/${item._id}/${item.name}`)"
          class="p-5 bg-white/15 rounded-xl cursor-pointer hover:bg-white/20 transition"
        >
          <div class="font-medium text-xl capitalize">{{ item.name }}</div>
          <div class="text-lg">
            {{ item.amount.toLocaleString() }} <span class="text-sm font-light">so'm</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
