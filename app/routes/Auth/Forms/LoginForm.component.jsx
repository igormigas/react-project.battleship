import React from 'react';
import PropTypes from 'prop-types';

import FacebookButton from '../../components/Facebook/FacebookButton';

import classes from './AuthForms.scss';

const loginForm = props => (
  <div>
    <h3>Log in</h3>
    <form>
      <input className={classes.loginInput}>Jacob Flavius</input>
      <input className={classes.loginInput} />
    </form>
    <FacebookButton onClickHandler={props.eventSubmit} />

  </div>
);

loginForm.propTypes = {
  eventSubmit: PropTypes.func.isRequired,
};

export default loginForm;
