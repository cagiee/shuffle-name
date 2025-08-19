<template>
  <div class="relative w-[100%] h-[100vh] border rounded-lg overflow-hidden">
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
  // confettiInstance({ particleCount: 120, spread: 70, origin: { y: 0 } });
  confettiInstance({
    particleCount: 400,
    angle: 0,
    spread: 1000,
    origin: { x: 0.5, y: -0.1 },
  });
  confettiInstance({
    particleCount: 400,
    angle: 0,
    spread: 1000,
    origin: { x: 0.1, y: -0.1 },
  });
  confettiInstance({
    particleCount: 400,
    angle: 0,
    spread: 1000,
    origin: { x: 1, y: -0.1 },
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
