import { createStore } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';

const initialState = {
  showModal: false,
  todos: [],
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'modal/toggle':
      return {
        ...state,
        showModal: payload,
      };

    case 'add/todo':
      // switch (payload)
      return {
        todos: [...state.todos, payload],
        showModal: false,
      };

    case 'addDidMount/todo':
      return {
        ...state,
        todos: [...payload],
      };

    case 'delete/todo':
      return {
        ...state,
        todos: [...payload],
      };

    case 'completed/todo':
      return {
        ...state,
        todos: [...payload],
      };

    default:
      return state;
  }
};

const store = createStore(reducer, devToolsEnhancer());

export default store;
