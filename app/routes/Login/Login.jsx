import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

//import LoginForm from './LoginForm.component';
import FacebookButton from '../../components/Facebook/FacebookButton';

import auth from '../../modules/auth';

import classes from './Login.scss'

class Login extends React.Component {

  state = {
    inputs: {}
  }

  onLoginHandler = () => {
    auth.login(this.onLoginSuccess, this.onLoginFailure)
  }

  onLoginSuccess = response => {
    console.log(response);
    this.props.userAuthenticated(response)
    this.props.history.replace('/');
  }

  onLoginFailure = response => {
  }

  onInputChangeHandler = e => {
    this.setState({
      inputs: {
        ...this.state.inputs,
        [e.target.name]: e.target.value
      }
    })
  }

  onFormSubmitHandler = e => {
    e.preventDefault();
    console.log('Login: ', e.target.name);
  }

  render() {
    console.log(this.props)
    return (
      <div className={classes.LoginForm}>
        <form>
          <input onChange={this.onInputChangeHandler} className={classes.loginInput} name="login" type="text" placeholder="login" value={this.state.login} />
          <input onChange={this.onInputChangeHandler} className={classes.loginInput} name="password" type="password" placeholder="password" value={this.state.password} />
          <input onClick={this.onFormSubmitHandler} className={classes.loginInput} name="submit" type="submit" value="SIGN IN" />
        </form>
        <h3>or..</h3>
        <FacebookButton onClickHandler={this.onLoginHandler} />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    userAuthenticated: ( {id, first_name, last_name, picture} ) => dispatch({type: 'USER_AUTHENTICATE', payload: {id, first_name, last_name, picture}})
  }
}

export default connect(null, mapDispatchToProps)(Login);
