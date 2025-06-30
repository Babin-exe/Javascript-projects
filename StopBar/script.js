console.log("Hello world");
const time = document.querySelector(".displayTime");
const stop = document.querySelector(".stop");
const start = document.querySelector(".start");
const reset = document.querySelector(".reset");

let timer = null;

let [second, minute, hour] = [0, 0, 0];

stop.addEventListener("click", () => {
  watchStop();
});

start.addEventListener("click", () => {
  watchStart();
});

reset.addEventListener("click", () => {
  watchReset();
});

function stopWatch() {
  second++;
  if (second == 60) {
    minute++;
    second = 0;
  }
  if (minute == 60) {
    hour++;
    minute = 0;
  }
  let h = hour < 10 ? "0" + hour : hour;
  let m = minute < 10 ? "0" + minute : minute;
  let s = second < 10 ? "0" + second : second;
  time.innerHTML = h + ":" + m + ":" + s;
}


function watchStart() {
  if (timer !== null) {
    clearInterval(timer);
  }
  timer = setInterval(stopWatch, 1000);
}

function watchStop() {
  clearInterval(timer);
}
function watchReset() {
  clearInterval(timer);
  [second, minute, hour] = [0, 0, 0];
  time.innerHTML = "00:00:00";
}
