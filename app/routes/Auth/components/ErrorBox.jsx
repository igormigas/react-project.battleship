import React from 'react';
import PropTypes from 'prop-types';

const errorBox = (props) => {

  function errorMessage(code) {
    switch (code) {
      case 'auth/popup-closed-by-user':                     return 'You must sign up in popup window or choose diffrent method to proceed.';
      case 'auth/user-cancelled':                           return 'You must sign up in popup window or choose diffrent method to proceed.';
      case 'auth/account-exists-with-different-credential': return 'Seems that someone is already signed up with this e-mail!';
      case 'auth/email-already-in-use':                     return 'Seems that someone is already signed up with this e-mail!';
      case 'auth/invalid-email':                            return 'Wrong email syntax!';
      case 'auth/user-not-found':                           return 'There is no such user. Please try again or sign up.';
      case 'auth/weak-password':                            return 'Password must have at least 6 characters.';
      case 'auth/user-disabled':                            return 'This account was blocked. Please contact administrator.';
      case 'auth/user-not-found':                           return 'Account was not found.';
      case 'auth/operation-not-allowed':                           return 'Signing in with this provider is currently disabled. Please try different option.';

      default: return 'Unknown error: ' + code;
    }
  }

  return props.code ? (
    <div>
      {errorMessage( props.code )}
    </div>
  ) : null;
}

errorBox.propTypes = {
  code: PropTypes.string,
}

export default errorBox;
