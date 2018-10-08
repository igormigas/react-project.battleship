import React from 'react';
import PropTypes from 'prop-types';

import ErrorBox from './components/ErrorBox';
import SignUp from './components/forms/SignUp';
import SignIn from './components/forms/SignIn';
import FacebookLoginButton from './components/buttons/FacebookLoginButton';
import GoogleLoginButton from './components/buttons/GoogleLoginButton';

import classes from './AuthForms.scss';

class AuthForms extends React.Component {
  state = {
    showSignUpForm: false,
  };

  toggleForm = () => {
    this.setState(prevState => ({
      showSignUpForm: !prevState.showSignUpForm,
    }));
  };

  onServiceLoginSubmit = (e) => this.props.onServiceLoginSubmit(e.target.name);

  render() {
    return (
      <div className={classes.LoginForm}>
        <button onClick={this.toggleForm}>Toggle</button>
        <ErrorBox code={this.props.errorCode} />
        { this.state.showSignUpForm
          ? <SignUp onSubmitEvent={this.props.onSignUpSubmit} />
          : <SignIn onSubmitEvent={this.props.onSignInSubmit} />
        }
        <h3>or..</h3>
        <FacebookLoginButton onClickHandler={this.onServiceLoginSubmit} />
        <br />
        <GoogleLoginButton onClickHandler={this.onServiceLoginSubmit} />
      </div>
    );
  }
}

AuthForms.propTypes = {
  errorCode: PropTypes.string,
  onSignUpSubmit: PropTypes.func.isRequired,
  onSignInSubmit: PropTypes.func.isRequired,
  onServiceLoginSubmit: PropTypes.func.isRequired,
};

export default AuthForms;
