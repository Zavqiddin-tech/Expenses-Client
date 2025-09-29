<script setup>
import { ref, watch, onMounted } from 'vue'

const props = defineProps(['progress'])

const displayValue = ref(0)
const dashOffset = ref(0)

const radius = 70
const circumference = 2 * Math.PI * radius

const animateProgress = () => {
  const start = performance.now()
  const from = 0
  const to = props.progress
  const duration = 1000

  const step = (timestamp) => {
    const elapsed = timestamp - start
    const progressRatio = Math.min(elapsed / duration, 1)
    const current = from + (to - from) * progressRatio

    displayValue.value = current.toFixed(0)
    dashOffset.value = circumference - (current / 100) * circumference

    if (progressRatio < 1) {
      requestAnimationFrame(step)
    }
  }

  requestAnimationFrame(step)
}

onMounted(() => {
  animateProgress()
})

watch(
  () => props.progress,
  () => {
    animateProgress()
  },
)
</script>

<template>
  <div class="flex justify-center p-5">
    <div class="relative w-40 h-40 flex items-center justify-center">
      <!-- Orqa doira -->
      <svg class="w-full h-full transform -rotate-90">
        <circle
          :r="radius"
          :cx="80"
          :cy="80"
          stroke="#ffffff50"
          stroke-width="15"
          fill="transparent"
        />
        <!-- Progress doira -->
        <circle
          :r="radius"
          :cx="80"
          :cy="80"
          stroke="#A684FF"
          stroke-width="15"
          fill="transparent"
          stroke-linecap="round"
          :stroke-dasharray="circumference"
          :stroke-dashoffset="dashOffset"
        />
      </svg>

      <!-- Markazdagi % -->
      <div class="absolute flex flex-col items-center">
        <span class="text-xl">{{ displayValue }}<i class="fa-solid fa-percent text-sm"></i></span>
        <span class="text-sm font-light">sarflandi</span>
      </div>
    </div>
  </div>
</template>

<style>
.a {
  color: #ffffff69;
}
</style>
