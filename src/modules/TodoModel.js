class TodoModel {
  constructor() {}

  getTodoList() {
    return JSON.parse(localStorage.getItem('todoList')) || [];
  }

  setTodoList(todoList) {
    localStorage.setItem('todoList', JSON.stringify(todoList));
  }
}

export default new TodoModel();
