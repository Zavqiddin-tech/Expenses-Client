<script setup>
import { ref, onMounted } from 'vue'
import { useApiStore } from '@/stores/api/api'
const api = useApiStore()

const state = ref({})

onMounted(() => {
  api
    .getAxios({
      url: 'balans/get-all',
    })
    .then((res) => {
      console.log(res.data)
      state.value = { ...res.data }
    })
})
</script>

<template>
  <div v-if="state._id" class="p-5 text-left">
    <div class="font-light">Umumiy balans</div>
    <div class="pt-3">
      <span class="font-semibold text-4xl pr-2">{{ state.amount.toLocaleString() }}</span>
      <span class="font-light">so'm</span>
    </div>
    <div>
      <span class="text-sm font-light">Sentabrdagi chiqim 0 so'm</span>
    </div>
  </div>
  <div v-else="state._id" class="p-5 text-left">
    <div class="font-light">Umumiy balans</div>
    <div class="pt-3">
      <span class="font-semibold text-xl pr-2"><i class="fa-solid fa-circle-notch animate-spin"></i></span>
      <span class="font-light">so'm</span>
    </div>
    <div>
      <span class="text-sm font-light">Sentabrdagi chiqim 0 so'm</span>
    </div>
  </div>
</template>
