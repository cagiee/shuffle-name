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
      scalar: 1.5, // increased from 1.0
      particleCount: 0, // increased from 50
      spread: 1000, // increased from 50
      colors: ["#f2b156ff"],
      ...options,
    });
  };
}
