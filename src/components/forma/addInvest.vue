<script setup>
import { reactive } from 'vue'
import Tranzaksiya from '@/views/invest/categoryInvest.vue'
import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { useApiStore } from '@/stores/api/api'
const api = useApiStore()

const state = reactive({
  amount: 0,
})

const add = () => {
  api
    .postAxios({
      url: 'invest/create',
      data: state,
    })
    .then((res) => {
      console.log(res.data)
    })
}
</script>

<template>
  <div class="p-8 text-white">
    <div class="pb-10 text-center text-lg font-semibold">Sarmoya</div>
    <form @submit.prevent="add">
      <FormField name="price">
        <FormItem class="mt-5">
          <FormLabel>Necha pul</FormLabel>
          <FormControl>
            <Input type="number" autocomplete="off" v-model="state.amount" />
          </FormControl>
        </FormItem>
      </FormField>
      <div class="flex justify-center">
        <Button
          type="submit"
          class="w-full mt-5 bg-white text-black cursor-pointer hover:text-black hover:bg-white/60"
        >
          Yuborish
        </Button>
      </div>
    </form>
    <Tranzaksiya />
  </div>
</template>

<style></style>
