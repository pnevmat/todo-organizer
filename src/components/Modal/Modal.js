import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import { connect } from 'react-redux';
import actions from '../../redux/actions';
import './Modal.scss';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.toggleModal(this.props.showModal);
    }
  };

  handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      this.props.toggleModal(this.props.showModal);
    }
  };

  render() {
    return createPortal(
      <div className="Modal__backdrop" onClick={this.handleBackdropClick}>
        <div className="Modal__content">{this.props.children}</div>
      </div>,
      modalRoot,
    );
  }
}

const mapStateToProps = state => ({
  showModal: state.showModal,
  todos: state.todos,
});

const mapDispatchToProps = dispatch => ({
  toggleModal: showModal => dispatch(actions.toggleModal(showModal)),
  addTodo: text => dispatch(actions.addTodo(text)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
