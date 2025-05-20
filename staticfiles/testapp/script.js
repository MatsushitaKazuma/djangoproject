document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".todo-form");
  const input = document.querySelector(".todo-input");
  const list = document.getElementById("todo-list");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (text === "") return;

    const li = document.createElement("li");
    li.className = "todo-item";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    const span = document.createElement("span");
    span.className = "todo-text";
    span.textContent = text;

    checkbox.addEventListener("change", () => {
      span.classList.toggle("completed", checkbox.checked);
    });

    const delBtn = document.createElement("button");
    delBtn.className = "delete-button";
    delBtn.innerHTML = "✖";
    delBtn.addEventListener("click", () => {
      li.remove();
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(delBtn);

    list.appendChild(li);
    input.value = "";
  });
});
