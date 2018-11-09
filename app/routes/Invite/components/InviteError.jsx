import React from 'react';
import PropTypes from 'prop-types';

//import classes from './InviteError.scss';

const InviteError = ({ text, onConfirmHandler }) => (
  <div>
    <p>Sorry, the game you want to join is out of your reach.</p>
    <button onClick={onConfirmHandler}>Go to Lobby</button>
  </div>
);

InviteError.propTypes = {
  text: PropTypes.string,
  onConfirmHandler: PropTypes.func.isRequired,
};

export default InviteError;
