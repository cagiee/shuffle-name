<template>
  <div ref="container" class="confetti-container">
    <!-- Confetti canvas (only inside this div) -->
    <canvas ref="canvas" class="confetti-canvas"></canvas>

    <!-- Your content -->
    <div class="content">
      <button @click="celebrate">Burst 🎉</button>
      <button @click="startRain">Start Rain 🌈</button>
      <button @click="stop">Stop ✋</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import confetti from "canvas-confetti";

const container = ref(null);
const canvas = ref(null);
let confettiInstance = null;
let raining = false;
let rafId = null;
let resizeObserver = null;

// Make canvas match container size (including retina)
const syncCanvasSize = () => {
  const dpr = window.devicePixelRatio || 1;
  canvas.value.style.width = container.value.clientWidth + "px";
  canvas.value.style.height = container.value.clientHeight + "px";
  canvas.value.width = Math.floor(container.value.clientWidth * dpr);
  canvas.value.height = Math.floor(container.value.clientHeight * dpr);

  const ctx = canvas.value.getContext("2d");
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
};

const celebrate = () => {
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
};

const startRain = () => {
  if (!confettiInstance || raining) return;
  raining = true;
  const loop = () => {
    if (!raining) return;
    confettiInstance({
      particleCount: 5,
      startVelocity: 35,
      spread: 80,
      ticks: 200,
      origin: { x: Math.random(), y: -0.1 },
    });
    rafId = requestAnimationFrame(loop);
  };
  loop();
};

const stop = () => {
  raining = false;
  if (rafId) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }
  if (confettiInstance) confettiInstance.reset();
};

onMounted(() => {
  syncCanvasSize();
  confettiInstance = confetti.create(canvas.value, {
    resize: false,
    useWorker: true,
  });
  resizeObserver = new ResizeObserver(syncCanvasSize);
  resizeObserver.observe(container.value);
});

onBeforeUnmount(() => {
  stop();
  if (resizeObserver) resizeObserver.disconnect();
});
</script>

<style scoped>
.confetti-container {
  position: relative;
  width: 420px;
  height: 300px;
  border: 1px solid #ccc;
  border-radius: 12px;
  overflow: hidden;
}

.confetti-canvas {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.content {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
}
</style>
