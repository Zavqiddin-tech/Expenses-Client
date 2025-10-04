<script setup>
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { reactive, onMounted } from 'vue'
import router from '@/router'
import { convertDate } from '@/func/date'
import { storeToRefs } from 'pinia'
import { useApiStore } from '@/stores/api/api'
import { useStateStore } from '@/stores/state'
const api = useApiStore()
const { user, departmentExpenses } = storeToRefs(useStateStore())

const state = reactive({
  name: '',
})
const parse = (name) => {
  state.name = name
}

const update = (id) => {
  api
    .patchAxios({
      url: `departmentExpenses/${id}`,
      data: state,
    })
    .then((res) => {
      departmentExpenses.value = departmentExpenses.value.map((e) => {
        if (e._id == res.data._id) {
          return res.data
        } else {
          return e
        }
      })
    })
}

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
      <div
        class="flex items-center gap-5 cursor-pointer"
        @click="router.push(`/expenses/${item._id}/${item.name}`)"
      >
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
      <div
        @click="router.push(`/expenses/${item._id}/${item.name}`)"
        class="text-sm text-[#bec3c8]"
      >
        {{ convertDate(item.createdAt) }}
      </div>
      <div v-if="user.role === 'admin'">
        <AlertDialog>
          <AlertDialogTrigger>
            <i
              @click="parse(item.name)"
              class="fa-solid fa-pen-to-square text-xl text-white cursor-pointer"
            ></i>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Xarajat bo'lim nomi, yangilash</AlertDialogTitle>
              <AlertDialogDescription>
                <FormField name="price">
                  <FormItem class="mt-5">
                    <FormLabel>Nomi</FormLabel>
                    <FormControl>
                      <Input type="text" autocomplete="off" v-model="state.name" />
                    </FormControl>
                  </FormItem>
                </FormField>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel
                class="bg-red-500 text-white hover:bg-red-400 hover:text-white cursor-pointer"
                @click="cancel"
                >Bekor qilish</AlertDialogCancel
              >
              <AlertDialogAction
                class="cursor-pointer"
                :disabled="state.name ? false : true"
                @click="update(item._id)"
                >Davom etish</AlertDialogAction
              >
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  </div>
</template>
