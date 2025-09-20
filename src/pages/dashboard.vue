<script setup>
import Hero from '@/components/layout/hero.vue';
import Balans from '@/views/dashboard/balans.vue'
import DashMain from '@/views/dashboard/dashMain.vue'
</script>

<template>
  <div>
    <Hero />
    <div class="pt-8 text-white">
      <Balans />
    </div>
    <!-- body -->
    <DashMain />
  </div>
</template>

<style></style>
