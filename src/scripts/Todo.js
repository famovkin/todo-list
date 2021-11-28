export default class Todo {
  constructor ({id, name}, {handleEditBtnClick, handleCopyBtnClick, handleDeleteBtnClick}, todoSelector) {
    this.id = id;
    this.name = name;
    this._handleEditBtnClick = handleEditBtnClick;
    this._handleCopyBtnClick = handleCopyBtnClick;
    this._handleDeleteBtnClick = handleDeleteBtnClick;
    this._todoSelector = todoSelector;
  }

  _getTemplate() {
    const todoElement = document
      .querySelector(this._todoSelector)
      .content
      .querySelector('.todo')
      .cloneNode(true);

    return todoElement;
  }

  generateTodo() {
    this.element = this._getTemplate();
    this._todoText = this.element.querySelector('.todo__text');
    this._editBtn = this.element.querySelector('.todo__btn_type_edit');
    this._copyBtn = this.element.querySelector('.todo__btn_type_duplicate');
    this._deleteBtn = this.element.querySelector('.todo__btn_type_delete');
    this._todoText.textContent = this.name;

    this._setEventListeners();

    return this.element;
  }

  updateTodo(newTodo) {
    this._todoText.textContent = newTodo;
  }

  _setEventListeners() {
    this._editBtn.addEventListener('click', () => {
      this._handleEditBtnClick(this);
    });
    this._copyBtn.addEventListener('click', () => {
      this._handleCopyBtnClick(this);
    });
    this._deleteBtn.addEventListener('click', () => {
      this._handleDeleteBtnClick(this);
    })
  }
}
