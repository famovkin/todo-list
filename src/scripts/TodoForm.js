export default class TodoForm {
  constructor({ formSelector, handleFormSubmit }) {
    this.form = document.querySelector(formSelector);
    this.submitFormButton = this.form.querySelector('.todos__submit-btn')
    this._inputList = this.form.querySelectorAll('.todos__input');
    this._handleFormSubmit = handleFormSubmit;
    this.initialTextButton = this.submitFormButton.textContent;
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  getEditTodoInfo(todoId, todoElement) {
    this._editTodoInfo = { id: todoId, element: todoElement };
  }

  changeInputValue(inputSelector, newValue) {
    this.form.querySelector(inputSelector).value = newValue;
  }

  changeSubmitButtonText(newText) {
    this.submitFormButton.textContent = newText;
  }

  setEventListeners() {
    this.form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues(), this._editTodoInfo);
    });
  }
}
