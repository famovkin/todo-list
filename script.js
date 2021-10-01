const todos = [
  "Сделать проектную работу",
  "Полить цветы",
  "Пройти туторил по Реакту",
  "Сделать фронт для своего проекта",
  "Погулять с собакой",
  "Разобраться в замыканих",
  "Решить задачу на Codewars",
];

const todoListElement = document.querySelector(".todos__list");
const todoFormElement = document.querySelector(".todos__form");

todoFormElement.addEventListener("submit", addTodo);

function renderTodo(todoText) {
  const todo = `<li class="todo todos__todo">
  <p class="todo__text">${todoText}</p>
  <div class="todo__buttons">
    <button class="todo__btn todo__btn_type_edit"></button>
    <button class="todo__btn todo__btn_type_dublicate"></button>
    <button class="todo__btn todo__btn_type_delete"></button>
  </div>
  </li>`;
  todoListElement.insertAdjacentHTML("afterbegin", todo);
}

function addTodo(event) {
  event.preventDefault();

  const newTodoText = event.currentTarget.querySelector(".todos__input").value;

  renderTodo(newTodoText);

  event.currentTarget.reset();
}

todos.map(renderTodo);
