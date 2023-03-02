const canvas = document.getElementById("sigpad");
const clear = document.getElementById("clear-btn");
const sigpad = new SignaturePad(canvas, {
  backgroundColor: "rgb(217,179,130)",
});

clear.addEventListener("click", () => {
  sigpad.clear();
});

function resizeCanvas() {
  const ratio = Math.max(window.devicePixelRatio || 1, 1);
  canvas.width = canvas.offsetWidth + ratio;
  canvas.height = canvas.offsetHeight * 1 + ratio;
}

window.onresize = resizeCanvas;
resizeCanvas();
