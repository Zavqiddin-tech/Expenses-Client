<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useApiStore } from '@/stores/api/api'
import { useStateStore } from '@/stores/state'
const api = useApiStore()
const { balans } = storeToRefs(useStateStore())

onMounted(() => {
  api
    .getAxios({
      url: 'rentbalans/getAll',
    })
    .then((res) => {
      balans.value = { ...res.data }
    })
})
</script>

<template>
  <div v-if="balans.amount >= 0" class="text-left">
    <div class="font-light">Kommunal balans</div>
    <div class="pt-1">
      <span class="font-semibold text-4xl pr-2">{{ balans.amount.toLocaleString() }}</span>
      <span class="font-light">so'm</span>
    </div>
  </div>
</template>
