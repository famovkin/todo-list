const todos = [
  "Сделать проектную работу",
  "Полить цветы",
  "Пройти туторил по Реакту",
  "Сделать фронт для своего проекта",
  "Погулять с собакой",
  "Разобраться в замыканих",
  "Решить задачу на Codewars",
];

const todoListElement = document.querySelector('.todos__list');

function renderTodo(todoText) {
  const todo = `<li class="todo todos__todo">
  <p class="todo__text">${todoText}</p>
  <div class="todo__buttons">
    <button class="todo__btn todo__btn_type_edit"></button>
    <button class="todo__btn todo__btn_type_dublicate"></button>
    <button class="todo__btn todo__btn_type_delete"></button>
  </div>
  </li>`;
  todoListElement.insertAdjacentHTML('afterbegin', todo)
}

todos.map(renderTodo);
