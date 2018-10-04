import React from 'react';
import PropTypes from 'prop-types';

import classes from './Forms.scss';

class SignUp extends React.Component {

  state = {
    inputs: {},
  };

  onInputChange = (e) => {
    this.setState({
      inputs: {
        ...this.state.inputs,
        [e.target.name]: e.target.value,
      },
    });
  };

  onFormSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmitEvent({ ...this.state.inputs });
  };

  render() {
    return (
      <form>
        <input
          onChange={this.onInputChange}
          className={classes.loginInput}
          name="username"
          type="text"
          placeholder="username"
          value={this.state.username}
          autoComplete="username"
        />
        <input
          onChange={this.onInputChange}
          className={classes.loginInput}
          name="email"
          type="email"
          placeholder="email"
          value={this.state.login}
          autoComplete="email"
        />
        <input
          onChange={this.onInputChange}
          className={classes.loginInput}
          name="password"
          type="password"
          placeholder="password"
          value={this.state.password}
          autoComplete="password"
        />
        <input
          onClick={this.onFormSubmit}
          className={classes.loginInput}
          name="submit"
          type="submit"
          value="SIGN UP"
        />
      </form>
    );
  }
};

SignUp.propTypes = {
  onSubmitEvent: PropTypes.func.isRequired,
}

export default SignUp;
