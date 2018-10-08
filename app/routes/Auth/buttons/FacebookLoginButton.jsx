import React from 'react';
import PropTypes from 'prop-types';

import ServiceLoginButton from './ServiceLoginButton';
import classes from './ServiceLoginButton.scss';

const facebookLoginButton = (props) => (
  <ServiceLoginButton
    provider="facebook.com"
    value="Log in with Facebook"
    classes={classes.facebook}
    onClickHandler={props.onClickHandler}
  />
);

facebookLoginButton.propTypes = {
  onClickHandler: PropTypes.func.isRequired,
};

export default facebookLoginButton;
