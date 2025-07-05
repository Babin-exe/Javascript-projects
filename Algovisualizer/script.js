let inputs = [10];
const putNumbers = document.querySelector(".container");

init();

function init() {
  putNumbers.innerHTML = " ";
  for (let i = 0; i < 20; i++) {
    inputs[i] = Math.random();
  }
  showBars();
}

let audioCtx = null;

function playNote(freq) {
  if (audioCtx == null) {
    audioCtx = new (AudioContext ||
      webKitAudioContext ||
      window.webKitAudioContext)();
  }
  const dur = 0.1;
  const osc = audioCtx.createOscillator();
  osc.frequency.value = freq;
  osc.start();
  osc.stop(audioCtx.currentTime + dur);
  const node = audioCtx.createGain();
  node.gain.value = 0.1;
  node.gain.linearRampToValueAtTime(0, audioCtx.currentTime + dur);
  osc.connect(node);
  node.connect(audioCtx.destination);
}

function play() {
  const copy = inputs;
  const swaps = bubbleSort(copy);
  animateSwap(swaps);
}

function animateSwap(swaps) {
  const bars = document.querySelectorAll(".container div");
  let i = 0;

  const Interval = setInterval(() => {
    if (i >= swaps.length) {
      clearInterval(Interval);
      return;
    }
    const [a, b] = swaps[i];
    const tempHeight = bars[a].style.height;
    bars[a].style.height = bars[b].style.height;
    bars[b].style.height = tempHeight;
    i++;

    bars[a].style.background = "red";
    bars[b].style.background = "red";

    setTimeout(() => {
      bars[a].style.background = "grey";
      bars[b].style.background = "grey";
    }, 100);

    playNote(200 + inputs[a] * 500);
    playNote(200 + inputs[b] * 500);
  }, 150);
}

function bubbleSort(inputs) {
  const swaps = [];
  for (let a = 0; a < inputs.length - 1; a++) {
    for (let b = 0; b < inputs.length - a; b++) {
      if (inputs[b] > inputs[b + 1]) {
        swaps.push([b, b + 1]);
        let temp = inputs[b];
        inputs[b] = inputs[b + 1];
        inputs[b + 1] = temp;
      }
    }
  }
  return swaps;
}

function showBars() {
  putNumbers.innerHTML = "";
  for (let i = 0; i < 20; i++) {
    const putDiv = document.createElement("div");
    putDiv.style.height = inputs[i] * 350 + "px";
    putDiv.style.width = "10px";
    putDiv.style.marginLeft = "2px";
    putDiv.style.paddingLeft = "10px";
    putDiv.style.background = "grey";
    putNumbers.appendChild(putDiv);
  }
}
