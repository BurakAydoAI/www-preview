// Import npm modules.
import confetti from "canvas-confetti";
// Find our component DOM on the page.
const buttons = document.querySelectorAll("[data-confetti-button]");
var duration = 1 * 1000;
var end = Date.now() + duration;

(function frame() {
  // launch a few confetti from the left edge
  confetti({
    particleCount: 7,
    angle: 60,
    spread: 55,
    origin: { x: 0 },
  });
  // and launch a few from the right edge
  confetti({
    particleCount: 7,
    angle: 120,
    spread: 55,
    origin: { x: 1 },
  });

  // keep going until we are out of time
  if (Date.now() < end) {
    requestAnimationFrame(frame);
  }
})();

// Add event listeners to fire confetti when a button is clicked.
buttons.forEach((button) => {
  button.addEventListener("click", () =>
    confetti({
      particleCount: 100,
      startVelocity: 40,
      spread: 300,
      origin: {
        x: Math.random(),
        // since they fall down, start a bit higher than random
        y: Math.random() - 0.2,
      },
    })
  );
});
