import React from 'react';

const Todo = ({ text, completed, toggleCompleted, deleteTodo }) => (
  <>
    <input
      type="checkbox"
      className="TodoList__checkbox"
      checked={completed}
      onChange={toggleCompleted}
    />
    <p className="TodoList__text">{text}</p>
    <button type="button" className="TodoList__btn" onClick={deleteTodo}>
      Удалить
    </button>
  </>
);

export default Todo;
