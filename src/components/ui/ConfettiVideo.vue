<template>
  <div class="relative w-[400px] h-[300px] border rounded-lg overflow-hidden">
    <canvas ref="confettiCanvas" class="confettiCanvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { createScopedConfetti } from "../../utils/confetti.js";

const confettiCanvas = ref(null);
let confettiInstance = null;

onMounted(() => {
  confettiInstance = createScopedConfetti(confettiCanvas.value);
});

function celebrate() {
  if (!confettiInstance) return;
  confettiInstance({ particleCount: 120, spread: 70, origin: { y: 0.8 } });
  confettiInstance({
    particleCount: 80,
    angle: 60,
    spread: 55,
    origin: { x: 0 },
  });
  confettiInstance({
    particleCount: 80,
    angle: 120,
    spread: 55,
    origin: { x: 1 },
  });
}

function stopConfetti() {
  if (confettiInstance) confettiInstance.reset();
}

// Expose celebrate to parent
defineExpose({
  celebrate,
});
</script>

<style lang="scss" scoped>
.confettiCanvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none; /* Prevent interaction with the canvas */
}
</style>
