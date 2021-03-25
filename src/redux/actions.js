import shortid from 'shortid';

const toggleModal = showModal => ({
  type: 'modal/toggle',
  payload: !showModal,
});

const addTodo = text => ({
  type: 'add/todo',
  payload: {
    id: shortid.generate(),
    text,
    completed: false,
  },
});

const addTodoFromLocalStorage = text => ({
  type: 'addDidMount/todo',
  payload: [...text],
});

const deleteTodo = todoId => {
  const todos = JSON.parse(localStorage.getItem('todos'));
  localStorage.removeItem('todos');
  const newTodos = todos.filter(({ id }) => id !== todoId);
  localStorage.setItem('todos', JSON.stringify(newTodos));
  return {
    type: 'delete/todo',
    payload: [...newTodos],
  };
};

const toggleCompleted = todoId => {
  const todos = JSON.parse(localStorage.getItem('todos'));
  localStorage.removeItem('todos');
  const todoCompleted = todos.map(todo =>
    todo.id === todoId ? { ...todo, completed: !todo.completed } : todo,
  );
  localStorage.setItem('todos', JSON.stringify(todoCompleted));
  return {
    type: 'completed/todo',
    payload: [...todoCompleted],
  };
};

export default {
  toggleModal,
  addTodo,
  addTodoFromLocalStorage,
  deleteTodo,
  toggleCompleted,
};
