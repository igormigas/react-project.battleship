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

  onServiceLoginSuccess = (response) => {
    const { isNewUser, ...userData } = response;
    if (isNewUser) {
      database.createNewUser(userData);
    } else {
      database.updateUser(userData);
    }
    this.props.history.replace('/');
  };

  onServiceLoginFailure = (response) => {
    this.displayError(response.code);
  };

  onEmailSignUpSuccess = (response) => {
    const { isNewUser, ...userData } = response;
    database.createNewUser(userData);
    this.props.history.replace('/');
  };

  onEmailSignUpFailure = (response) => {
    this.displayError(response.code);
  };

  onEmailSignInSuccess = (response) => {
    database.updateLastLoginTimestamp(response.uid);
    this.props.history.replace('/');
  };

  onEmailSignInFailure = (response) => {
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

  onLogoutHandler = () => {
    auth.logout();
  };

  displayError(code) {
    this.setState({ errorCode: code });
  }

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
