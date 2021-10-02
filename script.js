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
const todoInputFormElement = todoFormElement.querySelector(".todos__input");
const todoSumbitBtnElement =
  todoFormElement.querySelector(".todos__submit-btn");
const todoTemplateElement = document.querySelector(".todo-template");

let editingTodo = null;

todoFormElement.addEventListener("submit", addTodo);

document.body.addEventListener("click", (event) => {
  const todo = event.target.closest(".todo");

  if (!todo) {
    return;
  }

  if (event.target.classList.contains("todo__btn_type_edit")) {
    editTodo(todo);
  } else if (event.target.classList.contains("todo__btn_type_delete")) {
    deleteTodo(todo);
  } else if (event.target.classList.contains("todo__btn_type_duplicate")) {
    duplicateTodo(todo);
  }
});

function renderTodo(todoText) {
  const newTodo = todoTemplateElement.content.cloneNode(true);

  newTodo.querySelector(".todo__text").textContent = todoText;

  todoListElement.prepend(newTodo);
}

function addTodo(event) {
  event.preventDefault();

  const newTodoText = event.currentTarget.querySelector(".todos__input").value;

  if (editingTodo) {
    editingTodo.querySelector(".todo__text").textContent = newTodoText;

    todoSumbitBtnElement.textContent = "Добавить";

    editingTodo = null;
  } else {
    renderTodo(newTodoText);
  }

  event.currentTarget.reset();
}

function deleteTodo(todo) {
  todo.remove();
}

function editTodo(todo) {
  editingTodo = todo;

  todoInputFormElement.value =
    editingTodo.querySelector(".todo__text").textContent;

  todoSumbitBtnElement.textContent = "Сохранить";
}

function duplicateTodo(targetTodo) {
  const cloneTodo = targetTodo.cloneNode(true);

  targetTodo.after(cloneTodo);
}

todos.map(renderTodo);
