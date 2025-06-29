console.log("Hello World");

const edit = document.querySelector(".edit");
const notes = document.querySelector(".notes-container");

function updateStorage() {
  localStorage.setItem("hehe", notes.innerHTML);
}
function showNotes() {
  notes.innerHTML = localStorage.getItem("hehe");
}
showNotes();

edit.addEventListener("click", () => {
  console.log("Hello world");
  const container = document.createElement("div");
  container.classList.add("noteItem");

  const makeedit = document.createElement("p");
  makeedit.classList.add("inputBox");
  makeedit.contentEditable = "true";

  const deleteIcon = document.createElement("img");
  deleteIcon.classList.add("deleteBtn");
  deleteIcon.src = "images 3/delete.png";
  deleteIcon.setAttribute("contenteditable", "false");

  container.appendChild(makeedit);
  container.appendChild(deleteIcon);
  notes.appendChild(container);
});

notes.addEventListener("click", function (e) {
  if (e.target.tagName === "IMG") {
    e.target.parentElement.remove();
    updateStorage();
  } else if (e.target.tagName === "P") {
    const inputt = document.querySelectorAll(".inputBox");
    inputt.forEach((take) => {
      take.onkeyup = function () {
        updateStorage();
      };
    });
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "ENTER") {
    document.execCommand("insertLineBreak");
  }
});
