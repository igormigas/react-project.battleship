import React from 'react';
import PropTypes from 'prop-types';

import SidePanelComponent from './components/SidePanelComponent';
import ErrorBox from './components/ErrorBox';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import FacebookLoginButton from './components/social/FacebookLoginButton';
import GoogleLoginButton from './components/social/GoogleLoginButton';

import classes from './AuthForm.scss';

class AuthForm extends React.Component {
  state = {
    showSignUpForm: false,
  };

  onToggleFormHandler = () => {
    this.setState(prevState => ({
      showSignUpForm: !prevState.showSignUpForm,
    }));
  };

  onServiceLoginSubmit = (service) => this.props.onServiceLoginSubmit(service);

  render() {
    return (
      <div className={classes.FormContainer}>
        <SidePanelComponent
          signUp={this.state.showSignUpForm}
          onToggleModeEvent={this.onToggleFormHandler}
        />
        <div className={classes.Form}>
          <ErrorBox code={this.props.errorCode} />
          { this.state.showSignUpForm
            ? <SignUp onSubmitEvent={this.props.onSignUpSubmit} />
            : <SignIn onSubmitEvent={this.props.onSignInSubmit} />
          }
          <h3>or..</h3>
          <div>
            <FacebookLoginButton onClickHandler={this.onServiceLoginSubmit} />
            <GoogleLoginButton onClickHandler={this.onServiceLoginSubmit} />
          </div>
        </div>
      </div>
    );
  }
}

AuthForm.propTypes = {
  errorCode: PropTypes.string,
  onSignUpSubmit: PropTypes.func.isRequired,
  onSignInSubmit: PropTypes.func.isRequired,
  onServiceLoginSubmit: PropTypes.func.isRequired,
};

export default AuthForm;
