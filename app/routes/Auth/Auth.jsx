import React from 'react';
import PropTypes from 'prop-types';

import AuthForm from './forms/default/AuthForm';

import auth from '../../auth';
import database from '../../database';

class Auth extends React.Component {
  state = {
    inputs: {},
    errorCode: null,
  };

  onLogoutHandler = () => {
    auth.logout();
  };

  displayError(code) {
    this.setState({
      errorCode: code,
    });
  }

  /*
    codes:
      auth/invalid-email
      auth/user-disabled
      auth/user-not-found
      auth/wrong-password
    message
    */

  onServiceLoginSuccess = (response) => {
    const { isNewUser, ...userData } = response;
    if (isNewUser) {
      console.log('SERVICE LOGIN: NEW USER');
      database.createNewUser(userData);
    } else {
      console.log('SERVICE LOGIN: old USER');
      database.updateUser(userData);
    }
    console.log(response);
    this.props.history.replace('/');
  };

  onServiceLoginFailure = (response) => {
    console.log('SERVICE LOGIN FAILURE CALLBACK', response);
    this.displayError(response.code);
  };

  onEmailSignUpSuccess = (response) => {
    const { isNewUser, ...userData } = response;
    console.log(userData);
    database.createNewUser(userData);
    this.props.history.replace('/');
  };

  onEmailSignUpFailure = (response) => {
    console.log('FIREBASE SIGN UP ERROR: ', response.code, response.message);
    this.displayError(response.code);
  };

  onEmailSignInSuccess = (response) => {
    console.log('[EMAIL SIGNIN SUCCESS', response);
    const { uid } = response;
    database.updateLastLoginTimestamp(uid);
    this.props.history.replace('/');
  };

  onEmailSignInFailure = (response) => {
    console.log('[EMAIL SIGNIN FAIL', response);
    this.displayError(response.code);
  };

  onSignUpSubmit = ({ username, email, password }) => {
    auth.signUpWithEmail(
      username,
      email,
      password,
      this.onEmailSignUpSuccess,
      this.onEmailSignUpFailure,
    );
  };

  onSignInSubmit = ({ email, password }) => {
    auth.signInWithEmail(
      email,
      password,
      this.onEmailSignInSuccess,
      this.onEmailSignInFailure,
    );
  };

  onServiceLoginSubmit = (service) => {
    auth.loginWithService(service, this.onServiceLoginSuccess, this.onServiceLoginFailure);
  };

  componentDidMount() {
    if (this.props.match.params.mode === 'logout') {
      this.onLogoutHandler();
    }
  }

  render() {
    return (
      <AuthForm
        errorCode={this.state.errorCode}
        onSignUpSubmit={this.onSignUpSubmit}
        onSignInSubmit={this.onSignInSubmit}
        onServiceLoginSubmit={this.onServiceLoginSubmit}
      />
    );
  }
}

Auth.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default Auth;
