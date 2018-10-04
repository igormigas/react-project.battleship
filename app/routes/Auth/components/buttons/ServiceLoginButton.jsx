import React from 'react';
import PropTypes from 'prop-types';

import classes from './ServiceLoginButton.scss';

const serviceLoginButton = props => (
  <button
    type="button"
    className={[classes.Button, props.classes].join(' ')}
    name={props.provider}
    onClick={props.onClickHandler}
  >
    {props.value}
  </button>
);

serviceLoginButton.propTypes = {
	provider: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  classes: PropTypes.string.isRequired,
  onClickHandler: PropTypes.func.isRequired,
};

export default serviceLoginButton;
