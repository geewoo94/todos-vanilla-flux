class Controller {
  constructor({ view, model, store }) {
    this.view = view;
    this.model = model;
    this.store = store(this.render.bind(this));
  }

  updateModel() {
    const { todoList } = this.store.getStore();
    this.model.setTodoList(todoList);
  }

  addTodo(value) {
    const dispatch = this.store.dispatch;
    dispatch(this.store.actionCreators.addTodo(value));
    this.updateModel();
  }

  removeTodo(id) {
    const dispatch = this.store.dispatch;
    dispatch(this.store.actionCreators.removeTodo(id));
    this.updateModel();
  }

  toggleTodoCondition(id) {
    const dispatch = this.store.dispatch;
    dispatch(this.store.actionCreators.toggleTodoCondition(id));
    this.updateModel();
  }

  render(state) {
    if (!state) state = this.store.getStore();

    const controlls = {
      addTodo: this.addTodo.bind(this),
      removeTodo: this.removeTodo.bind(this),
      toggleTodoCondition: this.toggleTodoCondition.bind(this),
    };

    this.view.render({
      state,
      controlls,
    });
  }

  init() {
    const todoList = this.model.getTodoList();
    const dispatch = this.store.dispatch;
    dispatch(this.store.actionCreators.initTodoList(todoList));

    this.render();
  }
}

export default Controller;
