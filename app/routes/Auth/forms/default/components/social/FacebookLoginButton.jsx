import React from 'react';
import PropTypes from 'prop-types';

import ServiceLoginButton from './ServiceLoginButton';
import classes from './ServiceLoginButton.scss';
import serviceImageUrl from './facebook.svg';

const facebookLoginButton = (props) => (
  <ServiceLoginButton
    label="Log in with Facebook"
    imageUrl={serviceImageUrl}
    onClickHandler={() => props.onClickHandler('facebook.com')}
  />
);

facebookLoginButton.propTypes = {
  onClickHandler: PropTypes.func.isRequired,
};

export default facebookLoginButton;
