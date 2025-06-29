console.log("Hello world");

const success = document.querySelector(".success");
const error = document.querySelector(".error");
const invalid = document.querySelector(".invalid");
const toastBox = document.querySelector(".toastBox");

const successMessage = `<i class="fa-solid fa-circle-check"></i> 
Successfully Submitted`;

const ErrorMessage = `<i class="fa-solid fa-circle-xmark"></i>Some Kind of Error happened`;
const InvalidMessage = `<i class="fa-solid fa-circle-exclamation"></i></i>Invalid Input`;

success.addEventListener("click", () => showToast(successMessage, "success"));
error.addEventListener("click", () => showToast(ErrorMessage, "error"));
invalid.addEventListener("click", () => showToast(InvalidMessage, "invalid"));

function showToast(content, type) {
  let toast = document.createElement("div");
  toast.classList.add("toast");
  toast.innerHTML = content;
  toastBox.appendChild(toast);

  if (type == "error") {
    toast.classList.add("error");
  }
  if (type == "invalid") {
    toast.classList.add("invalid");
  }

  setTimeout(() => {
    toast.remove(toast);
  }, 2000);
}
