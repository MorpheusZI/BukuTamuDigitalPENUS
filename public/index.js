const canvas = document.getElementById("sigpad");
const clear = document.getElementById("clear-btn");
const savePNGButton = document.getElementById("savpng-btn");
const sigpad = new SignaturePad(canvas, {
  backgroundColor: "rgb(255,255,255)",
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

function download(dataURL, filename) {
  const blob = dataURLToBlob(dataURL);
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.style = "display: none";
  a.href = url;
  a.download = filename;

  document.body.appendChild(a);
  a.click();

  window.URL.revokeObjectURL(url);
}

function dataURLToBlob(dataURL) {
  // Code taken from https://github.com/ebidel/filer.js
  const parts = dataURL.split(";base64,");
  const contentType = parts[0].split(":")[1];
  const raw = window.atob(parts[1]);
  const rawLength = raw.length;
  const uInt8Array = new Uint8Array(rawLength);

  for (let i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i);
  }

  return new Blob([uInt8Array], { type: contentType });
}

savePNGButton.addEventListener("click", () => {
  console.log(sigpad.toDataURL("png"));
});
