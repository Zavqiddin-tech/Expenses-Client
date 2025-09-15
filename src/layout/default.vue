<script setup>
import { RouterView } from 'vue-router'
import Sidebar from '@/components/layout/sidebar.vue'
import hero from '@/components/layout/hero.vue'
import NavigationBar from '@/components/layout/navigationBar.vue';
</script>

<template>
  <div class="bg-white">
    <div class="max-w-[1920px] m-auto flex">
      <div class="w-[130px] h-screen p-3 sticky top-0 overflow-hidden hidden sm:block">
        <Sidebar />
      </div>
      <div class="sm:hidden">
        <NavigationBar />
      </div>
      <div class="route w-full p-5 pt-8 sm:pt-14">
        <hero class="mb-10" />
        <RouterView />
      </div>
    </div>
  </div>
</template>

<style>
@media (width >= 40rem) {
  .route {
    width: calc(100% - 130px);
  }
}

</style>
