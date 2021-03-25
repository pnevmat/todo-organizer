import React from 'react';
import PropTypes from 'prop-types';
import './IconButton.scss';

const IconButton = ({ children, toggleModal, showmodal, ...allyProps }) => (
  <button
    type="button"
    className="IconButton"
    onClick={() => toggleModal}
    {...allyProps}
  >
    {children}
  </button>
);

IconButton.defaultProps = {
  onClick: () => null,
  children: null,
};

IconButton.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node,
  'aria-label': PropTypes.string.isRequired,
};

export default IconButton;
