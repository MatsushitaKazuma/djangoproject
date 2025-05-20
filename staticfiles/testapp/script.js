document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".todo-form");
  const input = document.querySelector(".todo-input");
  const list = document.getElementById("todo-list");

  // localStorageからtodoリストを読み込む（なければ空配列）
  let todos = JSON.parse(localStorage.getItem("todos")) || [];

  // 表示用にtodoをレンダリングする関数
  const renderTodos = () => {
    list.innerHTML = ""; // 一旦リストを空にする

    todos.forEach((todo, index) => {
      const li = document.createElement("li");
      li.className = "todo-item";

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = todo.completed;

      const span = document.createElement("span");
      span.className = "todo-text";
      span.textContent = todo.text;
      if (todo.completed) span.classList.add("completed");

      checkbox.addEventListener("change", () => {
        todos[index].completed = checkbox.checked;
        saveTodos();
        span.classList.toggle("completed", checkbox.checked);
      });

      const delBtn = document.createElement("button");
      delBtn.className = "delete-button";
      delBtn.innerHTML = "✖";
      delBtn.addEventListener("click", () => {
        todos.splice(index, 1);  // 配列から削除
        saveTodos();
        renderTodos();  // 再描画
      });

      li.appendChild(checkbox);
      li.appendChild(span);
      li.appendChild(delBtn);

      list.appendChild(li);
    });
  };

  // localStorageに保存する関数
  const saveTodos = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  // フォームのsubmitイベント
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (text === "") return;

    // 新しいtodoを配列に追加
    todos.push({ text: text, completed: false });
    saveTodos();     // localStorageに保存
    renderTodos();   // リスト再描画
    input.value = ""; // 入力欄クリア
  });

  // 初期レンダリング
  renderTodos();
});
