import React from 'react';
import classNames from 'classnames';
import Todo from '../Todo';
import './TodoList.scss';

const TodoList = ({ todos, deleteTodo, toggleCompleted }) => (
  <ul className="TodoList">
    {todos.map(({ id, text, completed }) => (
      <li
        key={id}
        className={classNames('TodoList__item', {
          'TodoList__item--completed': completed,
        })}
      >
        <Todo
          text={text}
          completed={completed}
          toggleCompleted={() => toggleCompleted(id)}
          deleteTodo={() => deleteTodo(id)}
        />
      </li>
    ))}
  </ul>
);

export default TodoList;