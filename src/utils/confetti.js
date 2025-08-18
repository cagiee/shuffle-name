import confetti from "canvas-confetti";

// Create a scoped confetti instance for a specific canvas
export function createScopedConfetti(canvas) {
  // Style the canvas absolutely if not already
  canvas.style.position = "absolute";
  canvas.style.inset = "0";
  canvas.style.pointerEvents = "none";

  const instance = confetti.create(canvas, { resize: true, useWorker: true });

  // Wrap instance so we inject default particleCount & spread
  return (options = {}) => {
    return instance({
      particleCount: 300, // increased from 120
      spread: 120, // increased from 70
      origin: { y: 0.8 },
      ...options,
    });
  };
}
