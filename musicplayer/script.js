const song = new Audio("songs/nicedream.mp3");
const changable = document.querySelector(".changable");
const seekbar = document.querySelector(".seekbar");
const circle = document.querySelector(".circle");
const putname = document.querySelector(".name");
const timer = document.querySelector(".timer");
const left = document.querySelector(".left");
const right = document.querySelector(".right");
const dummy = document.querySelector(".dummy");

let isPlaying = false;

const playSVG = `
<svg class="play" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
    color="#000000" fill="none">
    <circle cx="12" cy="12" r="10" stroke="#141B34" stroke-width="1.5" />
    <path d="M15.9453 12.3948C15.7686 13.0215 14.9333 13.4644 13.2629 14.3502C11.648 15.2064 
        10.8406 15.6346 10.1899 15.4625C9.9209 15.3913 9.6758 15.2562 9.47812 
        15.0701C9 14.6198 9 13.7465 9 12C9 10.2535 9 9.38018 9.47812 8.92995C9.6758 
        8.74381 9.9209 8.60868 10.1899 8.53753C10.8406 8.36544 11.648 8.79357 
        13.2629 9.64983C14.9333 10.5356 15.7686 10.9785 15.9453 11.6052C16.0182 
        11.8639 16.0182 12.1361 15.9453 12.3948Z"
        stroke="#141B34" stroke-width="1.5" stroke-linejoin="round" />
</svg>`;

const pauseSVG = `
<svg class="pause" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
    color="#000000" fill="none">
    <path d="M4 7C4 5.58579 4 4.87868 4.43934 4.43934C4.87868 4 5.58579 4 7 4C8.41421 
    4 9.12132 4 9.56066 4.43934C10 4.87868 10 5.58579 10 7V17C10 18.4142 
    10 19.1213 9.56066 19.5607C9.12132 20 8.41421 20 7 20C5.58579 20 4.87868 
    20 4.43934 19.5607C4 19.1213 4 18.4142 4 17V7Z" stroke="currentColor" stroke-width="1.5" />
    <path d="M14 7C14 5.58579 14 4.87868 14.4393 4.43934C14.8787 4 15.5858 4 17 
    4C18.4142 4 19.1213 4 19.5607 4.43934C20 4.87868 20 5.58579 20 7V17C20 
    18.4142 20 19.1213 19.5607 19.5607C19.1213 20 18.4142 20 17 20C15.5858 
    20 14.8787 20 14.4393 19.5607C14 19.1213 14 18.4142 14 17V7Z" 
    stroke="currentColor" stroke-width="1.5" />
</svg>`;


changable.addEventListener("click", () => {
  if (!isPlaying) {
    song.play();
    changable.innerHTML = pauseSVG;
    isPlaying = true;
  } else {
    song.pause();
    changable.innerHTML = playSVG;
    isPlaying = false;
  }
});

seekbar.addEventListener("click", (e) => {
  const rect = seekbar.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const percentage = clickX / rect.width;
  song.currentTime = percentage * song.duration;
  circle.style.left = `${percentage * rect.width}px`;
});

song.addEventListener("timeupdate", () => {
  const percentage = song.currentTime / song.duration;

  let sec = formatTimer(song.currentTime);
  let min = formatTimer(song.duration);
  timer.innerHTML = `${sec}/${min}`;

  circle.style.left = `${percentage * seekbar.offsetWidth}px`;
});


const songname = song.src.split("/").pop();
putname.innerHTML = songname;



function formatTimer(total) {


  let minutes = Math.floor(total / 60);
  let seconds = Math.floor(total % 60);

  const realsec = seconds < 10 ? `0${seconds}` : seconds;
  return `${minutes}:${realsec}`;
}

left.addEventListener("click", () => {
  showMessage("I have not added this feature 😝");
});
right.addEventListener("click", () => {
  showMessage("I have not added this feature 😝");
});

function showMessage(param) {
  dummy.innerHTML = param;
  setTimeout(() => {
    dummy.innerHTML = " ";
  }, 2000);
}
