document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".todo-form");
  const input = document.querySelector(".todo-input");
  const list = document.getElementById("todo-list");

  // ローカルストレージから初期読み込み
  let todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos.forEach(todo => addTodo(todo.text, todo.completed));

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (text === "") return;
    addTodo(text);
    input.value = "";
  });

  function addTodo(text, completed = false) {
    const li = document.createElement("li");
    li.className = "todo-item";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = completed;

    const span = document.createElement("span");
    span.className = "todo-text";
    span.textContent = text;
    if (completed) span.classList.add("completed");

    checkbox.addEventListener("change", () => {
      span.classList.toggle("completed", checkbox.checked);
      saveTodos();
    });

    const delBtn = document.createElement("button");
    delBtn.className = "delete-button";
    delBtn.textContent = "✖";
    delBtn.addEventListener("click", () => {
      li.remove();
      saveTodos();
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(delBtn);
    list.appendChild(li);
    saveTodos();
  }

  function saveTodos() {
    const items = list.querySelectorAll(".todo-item");
    const todoData = [];
    items.forEach(item => {
      const text = item.querySelector(".todo-text").textContent;
      const completed = item.querySelector("input").checked;
      todoData.push({ text, completed });
    });
    localStorage.setItem("todos", JSON.stringify(todoData));
  }
});