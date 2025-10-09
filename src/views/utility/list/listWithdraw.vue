<script setup>
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
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
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import Button from '@/components/ui/button/Button.vue'
import { convertDate } from '@/func/date'

import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
const state = ref([])

import { useApiStore } from '@/stores/api/api'
import { useStateStore } from '@/stores/state'
const api = useApiStore()
const { user } = storeToRefs(useStateStore())

const deleteItem = (id) => {
  api
    .deleteAxios({
      url: `rentWithdraw/${id}`,
    })
    .then((res) => {
      state.value = state.value.filter((e) => e._id !== res.data._id)
    })
}

onMounted(() => {
  api
    .getAxios({
      url: 'rentwithdraw/getAll',
    })
    .then((res) => {
      console.log(res.data)
      state.value = [...res.data]
    })
})
</script>

<template>
  <Table>
    <TableCaption class="text-white/70"
      >kommunaldan yig'ilgan pullarni chiqarib olingani</TableCaption
    >
    <TableHeader>
      <TableRow class="hover:bg-white/0">
        <TableHead class="text-white"> Necha pul </TableHead>
        <TableHead class="text-white">Ma'lumot</TableHead>
        <TableHead class="text-white"> Sana </TableHead>
        <TableHead v-if="user.role === 'admin'" class="text-white text-right"> edit </TableHead>
      </TableRow>
    </TableHeader>
    <TableBody v-if="Array.isArray(state) && state.length > 0">
      <TableRow v-for="item in state" class="hover:bg-white/10 border-b-white/40">
        <TableCell>
          <span
            class="my-2 inline-flex items-center rounded-md bg-green-400/10 px-2 py-1 font-medium text-green-400 inset-ring inset-ring-green-500/20"
            >{{ item.amount.toLocaleString() }}
            <span class="text-xs text-white pl-2">so'm</span></span
          >
        </TableCell>
        <TableCell>
          <Popover>
            <PopoverTrigger>
              <span
                class="inline-flex items-center rounded-md bg-gray-300/10 px-2 py-1 text-xs font-medium text-gray-200 inset-ring inset-ring-gray-300/20"
                >Batafsil</span
              >
            </PopoverTrigger>
            <PopoverContent class="bg-black/40 text-white backdrop-blur border-white/30">
              <div v-if="item.text">
                {{ item.text }}
              </div>
            </PopoverContent>
          </Popover>
        </TableCell>
        <TableCell>
          <span
            class="inline-flex items-center rounded-md bg-blue-300/10 px-2 py-1 font-medium text-blue-300 inset-ring inset-ring-blue-300/30"
            >{{ convertDate(item.createdAt, 1) }}</span
          >
        </TableCell>
        <TableCell v-if="user.role === 'admin'" class="text-right">
          <AlertDialog>
            <AlertDialogTrigger>
              <i class="fa-solid fa-trash cursor-pointer"></i>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Bu ma'lumotni o'chirib yubormoqchimisiz?</AlertDialogTitle>
                <AlertDialogDescription>
                  Bu harakatni bekor qilib bo'lmaydi. Bu sizning hisobingizni doimiy ravishda
                  o'chirib tashlaydi va ma'lumotlaringizni bizning serverlarimizdan olib tashlaydi.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Bekor qilish</AlertDialogCancel>
                <AlertDialogAction @click="deleteItem(item._id)">Davom etish</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>
