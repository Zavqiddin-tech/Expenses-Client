<script setup>
import { RouterView } from 'vue-router'
import Sidebar from '@/components/layout/sidebar.vue'
import NavigationBar from '@/components/layout/navigationBar.vue'
</script>

<template>
  <div class="main min-h-screen text-white">
    <div class="max-w-[1920px m-auto flex">
      <div class="w-[130px] h-screen p-3 sticky top-0 overflow-hidden hidden sm:block">
        <Sidebar />
      </div>
      <div class="sm:hidden">
        <NavigationBar />
      </div>
      <div class="route w-full mb-15 sm:mb-0 p-3 sm:p-5 sm:pt-8">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<style>
.main {
  background-image: url('../assets/image/mobile-bg.jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}

@media (width >= 40rem) {
  .route {
    width: calc(100% - 130px);
  }
}
</style>
