const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const generateId = (length = 12) => {
  let id = '';

  for (let i = 0; i < length; i++) {
    const randomNumber = getRandomIntInclusive(65, 122);
    const randomStr = String.fromCharCode(randomNumber);
    id += randomStr;
  }

  return id;
}

export default function (subscriber) {
  /**
   * interface Todo {
   *   id: string;
   *   text: string;
   *   isDone: boolean;
   * }
   */
  let store = {
    todoList: [],
  };

  const ADD_TODO = 'addTodo';
  const REMOVE_TODO = 'removeTodo';
  const TOGGLE_TODO_CONDITION = 'toggleTodoCondition';
  const INIT_TODO_LIST = 'initTodoList';

  const actionCreators = {
    initTodoList: (payload) => {
      return {
        type: INIT_TODO_LIST,
        payload,
      }
    },
    addTodo: (payload) => {
      return {
        type: ADD_TODO,
        payload,
      }
    },
    removeTodo: (payload) => {
      return {
        type: REMOVE_TODO,
        payload,
      }
    },
    toggleTodoCondition: (payload) => {
      return {
        type: TOGGLE_TODO_CONDITION,
        payload,
      }
    },
  }

  const reducer = ({ type, payload }) => {
    switch (type) {
      case INIT_TODO_LIST: {
        return {
          ...store,
          todoList: payload,
        }
      }
      case ADD_TODO: {
        return {
          ...store,
          todoList: [
            ...store.todoList,
            { id: generateId(), text: payload, isDone: false }
          ]
        }
      }
      case REMOVE_TODO: {
        return {
          ...store,
          todoList: store.todoList.filter(todo => {
            return todo.id !== payload;
          }),
        }
      }
      case TOGGLE_TODO_CONDITION: {
        return {
          ...store,
          todoList: store.todoList.map(todo => {
            if (todo.id === payload) {
              return {
                ...todo,
                isDone: !todo.isDone,
              }
            }

            return todo;
          }),
        }
      }
      default: {
        return store;
      }
    }
  }

  const dispatch = (action) => {
    const comparison = reducer(action);

    if (store !== comparison) {
      store = comparison;
      subscriber(store);
    };
  }

  const getStore = () => {
    return store;
  }

  return {
    getStore,
    dispatch,
    actionCreators,
  };
};
