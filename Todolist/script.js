let selectinput = document.querySelector(".addtextt");
let selectbutton = document.querySelector(".adduserlist");
let puttheinfo = document.querySelector(".showtheinput");

selectbutton.addEventListener("click", putData);
selectinput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    putData();
  }
});

function putData() {
  let datawegot = selectinput.value.trim();
  if (datawegot === "") {
    return;
  }

  let mydynamic_div = document.createElement("div");

  mydynamic_div.innerHTML = `<span class="text_from">${datawegot}</span>
  <div id ="two_buttons">
  <button class ="edit">Edit</button>
  <button class="deletebutton">Delete</button>
  </div>
  `;

  mydynamic_div.classList.add("coloring_list");
  puttheinfo.appendChild(mydynamic_div);
  selectinput.value = "";

  mydynamic_div.querySelector(".deletebutton").addEventListener("click", () => {
    mydynamic_div.remove();
  });

  mydynamic_div.querySelector(".edit").addEventListener("click", () => {
    editData(mydynamic_div);
  });
}

function editData(mydynamic_div) {
  let data_from_span = mydynamic_div.querySelector(".text_from");
  let input_for_editing = document.createElement("input");
  input_for_editing.type = "text";
  input_for_editing.classList.add("new_text_to_update");
  input_for_editing.value = data_from_span.textContent;

  mydynamic_div.replaceChild(input_for_editing, data_from_span);
  input_for_editing.focus();

  function saveEdit() {
    if (!mydynamic_div.contains(input_for_editing)) return; 
    let final_thing =
      input_for_editing.value.trim() || data_from_span.textContent;
    let final_span = document.createElement("span");
    final_span.classList.add("text_from");
    final_span.textContent = final_thing;

    
    input_for_editing.removeEventListener("blur", saveEdit);
    input_for_editing.removeEventListener("keypress", handleKeyPress);
    
    mydynamic_div.replaceChild(final_span, input_for_editing);
  }

  function handleKeyPress(e) {
    if (e.key === "Enter") {
      saveEdit();
    }
  }

  input_for_editing.addEventListener("blur", saveEdit);
  input_for_editing.addEventListener("keypress", handleKeyPress);
}
