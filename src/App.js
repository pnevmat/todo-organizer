import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from './redux/actions';
import Container from './components/Container';
import TodoList from './components/TodoList';
import TodoEditor from './components/TodoEditor';
import Filter from './components/TodoFilter';
import Modal from './components/Modal';
import IconButton from './components/IconButton';
import { ReactComponent as AddIcon } from './icons/add.svg';

class App extends Component {
  state = {
    filter: '',
  };

  componentDidMount() {
    const todos = localStorage.getItem('todos');
    if (todos !== null) {
      const parsedTodos = JSON.parse(todos);
      this.props.addTodoFromLocalStorage(parsedTodos);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const nextTodos = this.props.todos;
    const prevTodos = JSON.parse(localStorage.getItem('todos'));

    if (nextTodos.length !== 0 && nextTodos !== null && prevTodos === null) {
      localStorage.setItem('todos', JSON.stringify(nextTodos));
    }

    if (nextTodos.length !== 0 && nextTodos !== null && prevTodos !== null) {
      localStorage.removeItem('todos');
      const todos = this.props.todos;
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleTodos = () => {
    if (
      localStorage.getItem('todos') !== 'null' &&
      localStorage.getItem('todos') !== null
    ) {
      const todos = JSON.parse(localStorage.getItem('todos'));
      const { filter } = this.state;
      const normalizedFilter = filter.toLowerCase();

      return todos.filter(({ text }) =>
        text.toLowerCase().includes(normalizedFilter),
      );
    } else {
      return [];
    }
  };

  calculateCompletedTodos = () => {
    const { todos } = this.props;

    return todos.reduce(
      (total, todo) => (todo.completed ? total + 1 : total),
      0,
    );
  };

  render() {
    const { filter } = this.state;
    const {
      showModal,
      toggleModal,
      addTodo,
      todos,
      onSubmitToggleModal,
      deleteTodo,
      toggleCompleted,
    } = this.props;

    const totalTodoCount = todos.length;
    const completedTodoCount = this.calculateCompletedTodos();
    const visibleTodos = this.getVisibleTodos();

    return (
      <Container>
        <IconButton
          onClick={toggleModal}
          showmodal={showModal.toString()}
          aria-label="Добавить todo"
        >
          <AddIcon width="40" height="40" fill="#fff" />
        </IconButton>

        {showModal && (
          <Modal>
            <TodoEditor
              onSubmit={addTodo}
              onSubmitToggleModal={onSubmitToggleModal}
              showModal={showModal}
            />
          </Modal>
        )}

        {/* TODO: вынести в отдельный компонент */}
        <div>
          <p>Всего заметок: {totalTodoCount}</p>
          <p>Выполнено: {completedTodoCount}</p>
        </div>

        <Filter value={filter} onChange={this.changeFilter} />

        <TodoList
          todos={visibleTodos}
          deleteTodo={deleteTodo}
          toggleCompleted={toggleCompleted}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  showModal: state.showModal,
  todos: state.todos,
});

const mapDispatchToProps = dispatch => ({
  toggleModal: () => dispatch(actions.toggleModal(false)),
  addTodo: text => dispatch(actions.addTodo(text)),
  deleteTodo: todoId => dispatch(actions.deleteTodo(todoId)),
  onSubmitToggleModal: showModal => dispatch(actions.toggleModal(showModal)),
  addTodoFromLocalStorage: todos =>
    dispatch(actions.addTodoFromLocalStorage(todos)),
  toggleCompleted: todoId => dispatch(actions.toggleCompleted(todoId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
