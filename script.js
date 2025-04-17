let Input = document.getElementById('input');
let btn = document.getElementById('addbtn');
let list = document.getElementById('result');

btn.addEventListener('click', (e) => {
  e.preventDefault();


  // Creating list and Appending to the Result Div
  let todos = document.createElement('li');
  let li = document.createElement('p');
  li.textContent = Input.value;
  todos.appendChild(li);
  if(Input.value === ""){
    todos.remove();
  }
  else{
    list.appendChild(todos);
  }
  Input.value = "";

  // Creating Checkbox and Appending to the list
  let check = document.createElement('input');
  check.type = "checkbox";
  check.className = "check";
  todos.prepend(check);

  check.addEventListener('change', () => {
    li.classList.toggle("checker");
    saveData();
  });

  // Creating Delete Button and appending to the list
  let deleteBtn = document.createElement('button');
  deleteBtn.innerHTML = `<i class="fa-solid fa-trash"></i>`;
  deleteBtn.className = "Delete";
  todos.appendChild(deleteBtn);

  // Adding Delete Function to the Delete Button
  deleteBtn.addEventListener('click', () => {
    list.removeChild(todos);
    saveData();
  });

  // Creating Edit button
  let editBtn = document.createElement('button');
  editBtn.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
  todos.appendChild(editBtn);

  // Addedit Functionality to the Edit Btn
  editBtn.addEventListener('click', () => {
    let currentText = todos.childNodes[1].textContent; // childNodes[1] skips checkbox
    let editInput = document.createElement('input');
    editInput.type = 'text';
    editInput.className = 'editInput';
    editInput.value = currentText;

    // Replace the text with the input field
    todos.childNodes[1].replaceWith(editInput);

    // Create Save button
    let saveBtn = document.createElement('button');
    saveBtn.innerHTML = `<i class="fa-solid fa-check"></i>`;

    // Replace Edit button with Save temporarily
    todos.replaceChild(saveBtn, editBtn);

    saveBtn.addEventListener('click', () => {
      let newText = editInput.value;
      let newP = document.createElement('p');
      newP.textContent = newText;
      newP.className = 'checked';
      editInput.replaceWith(newP);
      todos.replaceChild(editBtn, saveBtn);
      li = newP;
      saveData();
      
    });

  });

  saveData();
});

// Save innerHTML to localStorage
function saveData() {
  localStorage.setItem("data", list.innerHTML);
}

// Reattach all events after loading from localStorage
function reattachEvents() {
  let allTodos = list.querySelectorAll('li');

  allTodos.forEach((todos) => {
    let li = todos.querySelector('p');
    let check = todos.querySelector('.check');
    let deleteBtn = todos.querySelector('button'); // 1st button = delete
    let editBtn = todos.querySelectorAll('button')[1]; // 2nd button = edit

    check?.addEventListener('change', () => {
      li.classList.toggle("checker");
      saveData();
    });

    deleteBtn?.addEventListener('click', () => {
      list.removeChild(todos);
      saveData();
    });

    editBtn?.addEventListener('click', () => {
      let currentText = li.textContent;
      let editInput = document.createElement('input');
      editInput.type = 'text';
      editInput.className = 'editInput';
      editInput.value = currentText;

      todos.replaceChild(editInput, li);

      let saveBtn = document.createElement('button');
      saveBtn.innerHTML = `<i class="fa-solid fa-check"></i>`;
      todos.replaceChild(saveBtn, editBtn);

      saveBtn.addEventListener('click', () => {
        let newText = editInput.value;
        let newP = document.createElement('p');
        newP.textContent = newText;
        newP.className = 'checked';
        todos.replaceChild(newP, editInput);
        todos.replaceChild(editBtn, saveBtn);
        li = newP;
        saveData();
      });
    });
  });
}
// Show data on load and reattach listeners
function showdata() {
  list.innerHTML = localStorage.getItem("data");
  reattachEvents();
}
showdata();
