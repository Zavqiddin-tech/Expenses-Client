<script setup>
import { useRoute } from 'vue-router'

// Marshrutlar ro'yxati
const routes = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    icon: 'fa-solid fa-house',
  },
  {
    name: 'Sarmoya',
    path: '/invest',
    icon: 'fa-solid fa-chart-simple',
  },
  {
    name: 'expense',
    path: '/expense',
    icon: 'fa-solid fa-money-bill-trend-up',
  },
  {
    name: 'Xabarlar',
    path: '/messages',
    icon: 'fa-regular fa-comment-dots',
  },
  {
    name: 'Sozlamalar',
    path: '/signin',
    icon: 'fa-solid fa-gear',
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
  <div class="sidebar w-full py-4 fixed bottom-0 z-10 rounded-md bg-black text-white">
    <ul class="admin-list  flex justify-around items-center">
      <li v-for="(route, index) in routes" :key="index">
        <router-link :to="route.path" :class="{ active: isActiveRoute(route.path) }">
          <div class="flex items-center">
            <i :class="`${route.icon} text-[22px]`"></i>
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
}
.sidebar ul li .active {
  i {
    color: #ffffff;
  }
}
</style>
