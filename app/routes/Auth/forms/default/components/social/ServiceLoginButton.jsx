import React from 'react';
import PropTypes from 'prop-types';

import classes from './ServiceLoginButton.scss';

const serviceLoginButton = props => (
  <img
    src={props.imageUrl}
    alt={props.label}
    onClick={props.onClickHandler}
    style={{ width: '40px', margin: '5px' }}
  />
);

serviceLoginButton.propTypes = {
  label: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  onClickHandler: PropTypes.func.isRequired,
};

export default serviceLoginButton;
