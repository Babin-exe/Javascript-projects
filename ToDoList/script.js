console.log("ToDo App JS Loaded");

const takeInput = document.getElementById("take-input");
const listContainer = document.getElementById("list-container");

// Main function to add a task
function addTask() {
  const task = takeInput.value.trim();
  if (task === "") {
    alert("Please enter a valid task.");
    return;
  }

  const li = createTaskElement(task);
  listContainer.appendChild(li);
  saveData();
  takeInput.value = "";
}

// Create <li> task element with delete span
function createTaskElement(taskText) {
  const li = document.createElement("li");
  li.textContent = taskText;

  const span = document.createElement("span");
  span.innerHTML = "\u00d7"; // ×
  li.appendChild(span);

  return li;
}

// Handle click for checking and deleting tasks
listContainer.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("checked");
    saveData();
  } else if (e.target.tagName === "SPAN") {
    e.target.parentElement.remove();
    saveData();
  }
});

// Allow pressing "Enter" to add task
takeInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});

// Save current task list to localStorage
function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

// Load saved tasks from localStorage
function showData() {
  const saved = localStorage.getItem("data");
  if (saved) listContainer.innerHTML = saved;
}

// Initialize app
showData();
