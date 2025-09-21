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
    name: 'expenses',
    path: '/expenses',
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
  <div class="sidebar pt-8 h-full rounded-3xl bg-black shadow-lg shadow-black">
    <div class="pb-5 text-2xl text-center text-white font-extrabold">F.</div>
    <ul class="admin-list mt-10 flex flex-col items-center gap-12">
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
  padding: 0;
}

.sidebar .admin-list li {
  &:last-child {
    position: absolute;
    bottom: 120px;
  }
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
