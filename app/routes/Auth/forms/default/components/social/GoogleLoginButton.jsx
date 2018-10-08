import React from 'react';
import PropTypes from 'prop-types';

import ServiceLoginButton from './ServiceLoginButton';
import classes from './ServiceLoginButton.scss';
import serviceImageUrl from './google.svg';

const googleLoginButton = (props) => (
  <ServiceLoginButton
    label="Log in with Google"
    imageUrl={serviceImageUrl}
    onClickHandler={() => props.onClickHandler('google.com')}
  />
);

googleLoginButton.propTypes = {
  onClickHandler: PropTypes.func.isRequired,
};

export default googleLoginButton;
