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
const todoTemplateElement = document.querySelector(".todo-template");

todoFormElement.addEventListener("submit", addTodo);

function renderTodo(todoText) {
  const newTodo = todoTemplateElement.content.cloneNode(true);

  newTodo.querySelector(".todo__text").textContent = todoText;

  todoListElement.prepend(newTodo);
}

function addTodo(event) {
  event.preventDefault();

  const newTodoText = event.currentTarget.querySelector(".todos__input").value;

  renderTodo(newTodoText);

  event.currentTarget.reset();
}

todos.map(renderTodo);
