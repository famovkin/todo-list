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

  setListenersToTodo(newTodo);

  todoListElement.prepend(newTodo);
}

function addTodo(event) {
  event.preventDefault();

  const newTodoText = event.currentTarget.querySelector(".todos__input").value;

  renderTodo(newTodoText);

  event.currentTarget.reset();
}

function deleteTodo(event) {
  const todo = event.currentTarget.closest(".todo");
  todo.remove();
}

function editTodo(event) {
  const todo = event.currentTarget.closest(".todo");

  editingTodo = todo;

  todoInputFormElement.value =
    editingTodo.querySelector(".todo__text").textContent;

  todoSumbitBtnElement.textContent = "Сохранить";
}

function setListenersToTodo(todo) {
  todo
    .querySelector(".todo__btn_type_delete")
    .addEventListener("click", deleteTodo);
}

todos.map(renderTodo);
