import React from 'react';
import PropTypes from 'prop-types';

import FacebookButton from '../../../components/Facebook/FacebookButton';
import classes from './AuthForms.scss';

class AuthForms extends React.Component {

	state = {
    inputs: {},
  };

  onInputChangeHandler = (e) => {
    this.setState({
      inputs: {
        ...this.state.inputs,
        [e.target.name]: e.target.value,
      },
    });
  };

  onSignUpSubmit = (e) => {
    e.preventDefault();
  	this.props.onSignUpSubmit(
  		this.state.inputs.username,
  		this.state.inputs.email,
  		this.state.inputs.password,
  	);
  };

  onFacebookLoginSubmit = (e) => this.props.onServiceLoginSubmit('facebook.com');
  //onGoogleLoginSubmit = (e) => this.props.onServiceLoginSubmit('google.com');

	render() {
		return (
			<div className={classes.LoginForm}>
        <form>
          <input
            onChange={this.onInputChangeHandler}
            className={classes.loginInput}
            name="username"
            type="text"
            placeholder="username"
            value={this.state.username}
            autoComplete="username"
          />
          <input
            onChange={this.onInputChangeHandler}
            className={classes.loginInput}
            name="email"
            type="text"
            placeholder="email"
            value={this.state.login}
            autoComplete="email"
          />
          <input
            onChange={this.onInputChangeHandler}
            className={classes.loginInput}
            name="password"
            type="password"
            placeholder="password"
            value={this.state.password}
            autoComplete="password"
          />
          <input
            onClick={this.onSignUpSubmit}
            className={classes.loginInput}
            name="submit"
            type="submit"
            value="SIGN IN"
          />
        </form>
        <h3>or..</h3>
        <FacebookButton onClickHandler={this.onFacebookLoginSubmit} />
      </div>
		);
	};
}

AuthForms.propTypes = {
	onSignUpSubmit: PropTypes.func.isRequired,
  onSignInSubmit: PropTypes.func.isRequired,
  onServiceLoginSubmit: PropTypes.func.isRequired,
}

export default AuthForms;
