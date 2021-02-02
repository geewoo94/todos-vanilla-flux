import Controller from './modules/Controller.js';
import todoView from './modules/TodoView.js';
import todoModel from './modules/TodoModel.js';
import store from './modules/store.js';

const controller = new Controller({
  view: todoView,
  model: todoModel,
  store,
});
debugger;
controller.init();
