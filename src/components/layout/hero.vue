<script setup>
import cookies from 'vue-cookies'
import { storeToRefs } from 'pinia'
import { useStateStore } from '@/stores/state'
const { user } = storeToRefs(useStateStore())

// shadcn
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

// func
const LogOut = () => {
  cookies.remove('metan-token')
  location.reload()
}
</script>

<template>
 
  <!-- mobile -->
  <div v-if="user.fName" class="mobile p-1">
    <div class="flex justify-between items-center">
      <div class="text-lg">
        Hey, <span class="font-bold capitalize">{{ user.fName }} </span>
        <span class="text-2xl">👋</span>
      </div>
      <Popover>
        <PopoverTrigger>
          <div
            class="w-12 h-12 flex justify-center items-center rounded-full cursor-pointer text-white bg-violet-500"
          >
            <span class="uppercase">{{ user.fName[0] }}{{ user.lName[0] }}</span>
          </div>
        </PopoverTrigger>
        <PopoverContent class="bg-black/40 text-white backdrop-blur border-white/30">
          <div>
            <div class="pb-2 text-center capitalize">{{ user.fName }}</div>
            <div
              class="w-12 h-12 m-auto mb-2 rounded-full flex justify-center items-center text-xl font-semibold capitalize text-white bg-violet-500"
            >
              {{ user.fName[0] }}
            </div>
            <div class="text-center capitalize">{{ user.fName }} {{ user.lName }}</div>
            <div class="px-3 py-2 text-base hover:bg-black/10 rounded-md">
              @ {{ user.userName }}
            </div>
            <div class="px-3 py-2 hover:bg-black/10 rounded-md">
              <i class="fa-regular fa-circle-user"></i> {{ user.role }}
            </div>
          </div>
          <div @click="LogOut()" class="px-3 py-2 hover:bg-black/10 rounded-md cursor-pointer">
            <i class="fa-solid fa-power-off"></i> Chqish
          </div>
        </PopoverContent>
      </Popover>
    </div>
  </div>
</template>

<style>
.mobile.m-scrolled {
  background-color: #141414;
}
</style>
