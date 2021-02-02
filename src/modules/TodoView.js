const template = ({ todoList }) => `
  <div class='todos'>
    <form class='todo-form'>
      <input class='todo-input' />
      <button type='submit' class='todo-submit-button'>add</button>
    </form>
    <ul>
      ${todoList.map(todo => {
        return `
          <li>
            <span class='todo-text' data-id='${todo.id}'>${todo.text} ${todo.isDone ? 'DONE' : 'NOT DONE'}</span>
            <button class='todo-remove-button' data-id='${todo.id}'>delete</button>
          </li>
        `
      }).join('')}
    </ul>
  </div>
`;

class TodoView {
  constructor(template) {
    this.root = document.getElementById('root');
    this.template = template;
  }

  render({ state, controlls }) {
    const template = this.template(state);
    this.root.innerHTML = template;

    const todo = document.querySelector('.todos');
    const todoForm = todo.querySelector('.todo-form');

    //Add Todo
    todoForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const todoInput = todo.querySelector('.todo-input');
      controlls.addTodo(todoInput.value);
      todoInput.value = '';
    });

    //Remove Todo, Toggle Todo
    todo.addEventListener('click', (e) => {
      if (e.target.classList.contains('todo-remove-button')) {
        return controlls.removeTodo(e.target.dataset.id);
      }

      if (e.target.classList.contains('todo-text')) {
        return controlls.toggleTodoCondition(e.target.dataset.id);
      }
    });
  }
}

export default new TodoView(template);
