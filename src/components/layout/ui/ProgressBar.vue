<script setup>
import { ref, watch, onMounted } from "vue";

const props = defineProps(['progress'])

const displayValue = ref(0);
const rotation = ref("rotate(45deg)"); // 0% starts at 45deg

const animateProgress = () => {
  const start = performance.now();
  const from = 0;
  const to = props.progress;
  const duration = 1000;

  const step = (timestamp) => {
    const elapsed = timestamp - start;
    const progressRatio = Math.min(elapsed / duration, 1);
    const current = from + (to - from) * progressRatio;

    displayValue.value = current.toFixed(2);
    rotation.value = `rotate(${45 + current * 1.8}deg)`;

    if (progressRatio < 1) {
      requestAnimationFrame(step);
    }
  };

  requestAnimationFrame(step);
};

onMounted(() => {
  animateProgress();
});

watch(
  () => props.progress,
  () => {
    animateProgress();
  }
);
</script>

<template>
  <div
    class="w-full flex justify-center mt-10 px-5 py-8 rounded-4xl bg-white/20 backdrop-blur-xs"
  >
    <div class="progress">
      <div class="pb-3 text-sm font-light light:text-black">Holat</div>
      <div class="barOverflow">
        <div class="bar" :style="{ transform: rotation }"></div>
      </div>
      <span v-if="displayValue >= 0" class="text-xl font-medium"
        >{{ displayValue }} %</span
      >
      <span v-else class="text-xl font-medium"
        >0 %</span
      >
      <div class="pt-2 text-sm font-light light:text-black">Pul sarflandi</div>
    </div>
  </div>
</template>



<style scoped>
.progress {
  position: relative;
  margin: 4px;
  text-align: center;
  width: 150px;
}
.barOverflow {
  position: relative;
  overflow: hidden;
  width: 150px;
  height: 75px;
  margin-bottom: -28px;
}
.bar {
  position: absolute;
  top: 0;
  left: 0;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  box-sizing: border-box;
  border: 8px solid #eee;
  border-bottom-color: #bbf451;
  border-right-color: #bbf451;
  transition: transform 0.1s linear;
}
</style>
