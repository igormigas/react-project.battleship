import React from 'react';

import FacebookButton from '../../components/Facebook/FacebookButton';

import classes from './LoginForm.scss'

const loginForm = (props) => {
  return (
    <div>
      <h3>Log in</h3>
      <form>
        <input className={classes.loginInput}>Jacob Flavius</input>
        <input className={classes.loginInput} />
      </form>
      <FacebookButton onClickHandler={this.props.eventSubmit} />

    </div>
  );
};

export default loginForm;
