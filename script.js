const input = document.querySelector("input");
const SubmitBtn = document.querySelector("button");
const OutputContainer = document.querySelector(".OutputContainer");
const h1 = document.querySelector("h1");

input.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();

    document.getElementById("Submit").click();
  }
});

SubmitBtn.addEventListener("click", AddItem);
OutputContainer.addEventListener("click", RemoveItem);

MyTodos = [];

function AddItem() {
  if (input.value.length === 0) {
    input.style.borderColor = " #fc2f7e";
    input.classList.add("shake");
    setTimeout(() => {
      input.classList.remove("shake");
    }, 500);
  } else {
    MyTodos.push(input.value);

    const ul = document.createElement("ul");
    const li = document.createElement("li");
    const removeBtn = document.createElement("button");

    removeBtn.classList = "removeBtn";

    for (const Todos of MyTodos) {
      li.innerHTML = Todos;
      ul.append(li, removeBtn);
    }

    LocalStorage(input.value);
    OutputContainer.appendChild(ul);

    input.value = "";
    input.style.borderColor = " #4db588";
  }
}

function RemoveItem(e) {
  const item = e.target;
  if (item.classList[0] === "removeBtn") {
    const todo = item.parentElement;
    REmoveLocalStorage(todo);
    todo.remove();
  }

  if (item.classList[0] === "Completed") {
    const todo = item.parentElement;

    todo.classList.toggle("completed");

    if (localStorage.getItem("Done") === null) {
      completetList = [];
    } else {
      completetList = JSON.parse(localStorage.getItem("Done"));
    }

    completetList.push(todo.children[0].innerText);
    localStorage.setItem("Done", JSON.stringify(completetList));
  }
}

function test() {
  if (localStorage.getItem("Done") === null) {
    completetList = [];
  } else {
    completetList = JSON.parse(localStorage.getItem("Done"));
  }

  localStorage.setItem("Done", JSON.stringify(completetList));
}

test();

function LocalStorage(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function DisplayTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  for (const todo of todos) {
    const ul = document.createElement("ul");
    const li = document.createElement("li");
    const removeBtn = document.createElement("button");

    removeBtn.classList = "removeBtn";
    li.innerHTML = todo;

    ul.append(li, removeBtn);
    OutputContainer.appendChild(ul);
  }
}

function REmoveLocalStorage(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  const toDoIndex = todo.children[0].innerText;

  todos.splice(todos.indexOf(toDoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
DisplayTodos();
