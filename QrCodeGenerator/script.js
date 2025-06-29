const url = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=";

const qrContainer = document.querySelector(".imgBox");

const qrImage = document.querySelector(".qrCode");

const generateButton = document.querySelector(".generate");

const textInput = document.querySelector("#getText");

generateButton.addEventListener("click", () => {
  const takeInput = textInput.value.trim();
  if (takeInput.length > 0) {
    qrContainer.classList.add("showQr");
    console.log(takeInput);
    const linkToGive = url + takeInput;
    qrImage.src = linkToGive;
  } else {
    textInput.classList.add("error");
    textInput.style.background = "#ff9393";
    setTimeout(() => {
      textInput.classList.remove("error");
      textInput.style.background = "";
    }, 1000);
  }
});
