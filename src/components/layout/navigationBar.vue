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
    name: 'Kommunal',
    path: '/utility',
    icon: 'fa-solid fa-briefcase',
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
  <div
    class="sidebar w-[95%] py-4 fixed bottom-0 left-1/2 -translate-x-1/2 z-10 rounded-full bg-white/20 backdrop-blur-xs"
  >
    <ul class="flex justify-around items-center">
      <li v-for="(route, index) in routes" :key="index">
        <router-link :to="route.path" :class="{ active: isActiveRoute(route.path) }">
          <div class="flex flex-col items-center gap-1">
            <i :class="`${route.icon} text-[22px]`"></i>
            <span class="text-xs font-light">{{ route.name }}</span>
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
    color: #d3d3d3;
  }
  span {
    color: #d3d3d3;
  }
}
.sidebar ul li .active {
  i {
    color: oklch(60.6% 0.25 292.717);
  }
  span {
    color: oklch(60.6% 0.25 292.717);
  }
}
</style>
