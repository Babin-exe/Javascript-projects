const dateInput = document.getElementById("date");
const showAge = document.createElement("div");
showAge.classList.add("showAge");
const hehe = document.querySelector(".hehe");
const output = document.querySelector(".output-show");

dateInput.addEventListener("click", () => {
  dateInput.showPicker && dateInput.showPicker();
});

dateInput.max = new Date().toISOString().split("T")[0];

function calculteAge() {
  let birthDate = new Date(dateInput.value);
  let today = new Date();

  let birthDay = birthDate.getDay();
  let birthMonth = birthDate.getMonth() + 1;
  let birthYear = birthDate.getFullYear();

  let todayDay = today.getDay();
  let todayMonth = today.getMonth() + 1;
  let todayYear = today.getFullYear();

  let ageYear = todayYear - birthYear;
  let ageMonth = todayMonth - birthMonth;
  let ageDay = todayDay - birthDay;

  if (ageDay < 0) {
    ageDay += new Date(todayYear, todayMonth - 1, 0).getDate();
    ageMonth--;
  }

  if (ageMonth < 0) {
    ageMonth += 12;
    ageYear--;
  }
  if (ageDay || ageMonth || ageYear) {
    showAge.innerHTML = `Year: ${ageYear} , Month: ${ageMonth} , Day : ${ageDay}`;
    output.appendChild(showAge);
  } else {
    const str = "Select A valid Date";
    showAge.innerHTML = str;
    output.appendChild(showAge);
  }
}

hehe.addEventListener("click", calculteAge);
