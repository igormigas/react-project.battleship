import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import AuthForms from './forms/AuthForms';

import auth from '../../auth';
import database from '../../database';

class Auth extends React.Component {
  state = {
    inputs: {},
  };

  onLogoutHandler = () => {
    auth.logout();
  };

  onServiceLoginSuccess = (response) => {
    const { isNewUser, ...userData } = response;
    if (isNewUser) {
      database.createNewUser(userData);
    } else {
      database.updateUser(userData);
    }
    console.log(response);
    this.props.history.replace('/');
  };

  onServiceLoginFailure = (response) => {
    console.log('SERVICE LOGIN FAILURE CALLBACK', response);
  };

  onEmailLoginSuccess = (response) => {
    const { isNewUser, ...userData } = response;
    if (isNewUser) {
      database.createNewUser(userData);
    } else {
      database.updateUser(userData);
    }
    console.log(response);
    this.props.history.replace('/');
  };

  onEmailLoginFailure = (response) => {
    console.log('FIREBASE SIGN IN ERROR: ', response.code, response.message);
    /*
    codes:
      auth/invalid-email
      auth/user-disabled
      auth/user-not-found
      auth/wrong-password
    message
    */
  };

  onSignUpSubmit = (username, email, password) => {
    auth.signUpWithEmail(
      username,
      email,
      password,
      this.onEmailLoginSuccess,
      this.onEmailLoginFailure,
    );
  };

  onSignInSubmit = () => {

  }

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
      <AuthForms
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

const mapDispatchToProps = dispatch => ({

});

export default connect(null, mapDispatchToProps)(Auth);
