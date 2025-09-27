<script setup>
import { ref, onMounted } from 'vue'
import ProgressBar from '@/components/layout/ui/ProgressBar.vue'
const date = new Date()
const year = date.getFullYear()
const month = date.getMonth()

import { useApiStore } from '@/stores/api/api'
const api = useApiStore()

const data = ref(0)
onMounted(() => {
  api
    .getAxios({
      url: `report/this-month?year=${year}&month=${month}`,
    })
    .then((res) => {
      data.value = (res.data.chiqim / res.data.kirim) * 100
    })
})
</script>

<template>
  <div v-if="data >= 0" class="w-6/12">
    <ProgressBar :progress="data" />
  </div>
  
</template>
