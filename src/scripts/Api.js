export default class Api {
  constructor(config) {
    this._url = config.url,
    this._headers = config.headers
  }

  _checkServerResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Что-то пошло не так. Обратитесь к разработчику`);
  }

  getInitialTodoList() {
    return fetch(this._url, {
      method: 'GET',
      headers: this._headers
    })
      .then(res => this._checkServerResponse(res));
  }

  deleteTodo(todoId) {
    return fetch(`${this._url}/${todoId}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(res => this._checkServerResponse(res));
  }

  addTodo(todoName) {
    return fetch(this._url, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: todoName
      })
    })
      .then(res => this._checkServerResponse(res));
  }

  editTodo(todoName, todoId) {
    return fetch(`${this._url}/${todoId}`, {
      method: 'PUT',
      headers: this._headers,
      body: JSON.stringify({
        name: todoName,
      })
    })
      .then(res => this._checkServerResponse(res));
  }

  getTodo(idTodo) {
    return fetch(`${this._url}/${idTodo}`, {
      method: 'GET',
      headers: this._headers
    })
      .then(res => this._checkServerResponse(res));
  }
}
