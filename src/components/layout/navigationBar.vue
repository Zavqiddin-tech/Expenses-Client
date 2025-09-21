<script setup>
import { useRoute } from 'vue-router'

// Marshrutlar ro'yxati
const routes = [
  {
    name: 'Asosiy',
    path: '/dashboard',
    icon: 'fa-solid fa-house',
  },
  {
    name: 'Sarmoya',
    path: '/invest',
    icon: 'fa-solid fa-chart-simple',
  },
  {
    name: "To'lov",
    path: '/expenses',
    icon: 'fa-solid fa-money-bill-trend-up',
  },
  {
    name: 'Xabarlar',
    path: '/messages',
    icon: 'fa-regular fa-comment-dots',
  },
]

// Hozirgi marshrutni olish
const router = useRoute()

// Faol marshrutni tekshirish
const isActiveRoute = (path) => {
  return router.path === path
}
</script>

<template>
  <div class="sidebar w-full py-4 fixed bottom-0 z-10 bg-[#000000] text-white">
    <ul class="admin-list  flex justify-around items-center">
      <li v-for="(route, index) in routes" :key="index">
        <router-link :to="route.path" :class="{ active: isActiveRoute(route.path) }">
          <div class="flex flex-col items-center gap-1">
            <i :class="`${route.icon} text-[22px]`"></i>
            <span class="text-xs font-extralight">{{ route.name }}</span>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.sidebar ul {
  height: 100%;
  position: relative;
  list-style-type: none;
}

.sidebar ul li {
  i {
    color: #969696;
  }
  span {
    color: #a0a0a0;
  }
}
.sidebar ul li .active {
  i {
    color: #ffffff;
  }
  span {
    color: #ffffff;
  }
}
</style>
