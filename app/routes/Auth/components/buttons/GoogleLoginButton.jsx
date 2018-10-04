import React from 'react';
import PropTypes from 'prop-types';

import ServiceLoginButton from './ServiceLoginButton';
import classes from './ServiceLoginButton.scss';

const googleLoginButton = (props) => (
  <ServiceLoginButton
    provider="google.com"
    value="Log in with Google"
    classes={classes.google}
    onClickHandler={props.onClickHandler}
  />
);

googleLoginButton.propTypes = {
  onClickHandler: PropTypes.func.isRequired,
};

export default googleLoginButton;
