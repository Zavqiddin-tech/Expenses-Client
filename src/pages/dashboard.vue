<script setup>
import Hero from '@/components/layout/hero.vue';
import Balans from '@/views/dashboard/balans.vue'
import DashMain from '@/views/dashboard/dashMain.vue'
</script>

<template>
  <div>
    <Hero />
    <div class="mt-15 mb-5 p-5 text-white rounded-4xl bg-white/20 backdrop-blur-xs">
      <Balans />
    </div>
    <!-- body -->
    <DashMain />
  </div>
</template>

<style></style>
