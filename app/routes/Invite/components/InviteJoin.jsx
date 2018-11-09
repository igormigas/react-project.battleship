import React from 'react';
import PropTypes from 'prop-types';

//import classes from './InviteJoin.scss';

const InviteJoin = ({ onAcceptHandler, onRefuseHandler }) => (
  <div>
    <h3>Would you like to join the game?</h3>
    <button onClick={onAcceptHandler}>Yes!</button>
    <button onClick={onRefuseHandler}>Naah..</button>
  </div>
);

InviteJoin.propTypes = {
  onAcceptHandler: PropTypes.func.isRequired,
  onRefuseHandler: PropTypes.func.isRequired,
};

export default InviteJoin;
