const canvas = document.getElementById("sigpad");
const clear = document.getElementById("clear-btn");
const sigpad = new SignaturePad(canvas, {
  backgroundColor: "rgb(217,179,130)",
});

clear.addEventListener("click", () => {
  sigpad.clear();
});
