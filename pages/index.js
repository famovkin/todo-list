import Section from "../src/scripts/Section.js";
import Todo from "../src/scripts/Todo.js";
import Api from "../src/scripts/Api.js";
import TodoForm from "../src/scripts/TodoForm.js";
import "./index.css";

let editingTodo = null;

const api = new Api({
  url: "https://api-test.pa7lux.ru/streams",
  headers: {
    "Content-Type": "application/json",
  },
});

function createTodo(item) {
  const todo = new Todo(
    {
      id: item.id,
      name: item.name,
    },
    {
      handleEditBtnClick: (todoInfo) => {
        api
          .getTodo(todoInfo.id)
          .then((res) => {
            editingTodo = res.name;
            todoForm.getEditTodoInfo(res.id, todoInfo.element);
            todoForm.changeInputValue("[name=todo]", res.name);
            todoForm.changeSubmitButtonText("Cохранить");
            todoForm.form.querySelector("[name=todo]").focus();
          })
          .catch((err) => console.log(err));
      },
      handleCopyBtnClick: (todoInfo) => {
        api
          .getTodo(todoInfo.id)
          .then((res) => {
            api
              .addTodo(res.name)
              .then((res) => {
                const todoElement = createTodo(res);
                todoList.addItem(todoElement);
              })
              .catch((err) => console.log(err));
          })
          .catch((err) => console.log(err));
      },
      handleDeleteBtnClick: (todoInfo) => {
        api
          .deleteTodo(todoInfo.id)
          .then(() => todoInfo.element.remove())
          .catch((err) => console.log(err));
      },
    },
    ".todo-template"
  );

  const todoElement = todo.generateTodo();
  return todoElement;
}

const todoList = new Section(
  {
    renderer: (item) => {
      const todoElement = createTodo(item);
      todoList.addItem(todoElement);
    },
  },
  ".todos__list"
);

api
  .getInitialTodoList()
  .then((res) => todoList.renderItems(res))
  .catch((err) => console.log(err));

function showLoading({ isLoading, buttonElement }) {
  if (isLoading) {
    buttonElement.textContent = "Сохранение...";
  } else {
    buttonElement.textContent = "Добавить";
  }
}

const todoForm = new TodoForm({
  formSelector: ".todos__form",
  handleFormSubmit: (inputData, editTodoInfo) => {
    showLoading({
      isLoading: true,
      buttonElement: todoForm.submitFormButton,
    });
    if (editingTodo) {
      api
        .editTodo(inputData.todo, editTodoInfo.id)
        .then((res) => {
          editTodoInfo.element.querySelector(".todo__text").textContent =
            res.name;
          editingTodo = null;
        })
        .catch((err) => console.log(err))
        .finally(() => {
          todoForm.form.reset();
          showLoading({
            isLoading: false,
            buttonElement: todoForm.submitFormButton,
          });
        });
    } else {
      api
        .addTodo(inputData.todo)
        .then((res) => {
          const todoElement = createTodo(res);
          todoList.addItem(todoElement);
        })
        .catch((err) => console.log(err))
        .finally(() => {
          todoForm.form.reset();
          showLoading({
            isLoading: false,
            buttonElement: todoForm.submitFormButton,
          });
        });
    }
  },
});

todoForm.setEventListeners();
