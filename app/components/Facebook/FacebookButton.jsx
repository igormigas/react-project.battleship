import React from 'react';
import PropTypes from 'prop-types';

const facebookButton = props => (
  <button
    type="button"
    className="fbLoginButton"
    name="fbLoginSubmit"
    onClick={props.onClickHandler}
  >
    Log in with Facebook
  </button>
);

facebookButton.propTypes = {
  onClickHandler: PropTypes.func.isRequired,
};

export default facebookButton;
