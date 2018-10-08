import React from 'react';
import PropTypes from 'prop-types';

import classes from './NewGamePanel.scss';

const newGamePanel = (props) => {
  const onClickHandler = () => {
    props.history.push('/game');
  };

  return (
    <>
      <h4>Start your battleship experience!</h4>
      <button className={classes.newGameButton} onClick={onClickHandler}>New Game</button>
    </>
  );
};

newGamePanel.propTypes = {
  history: PropTypes.object.isRequired,
};

export default newGamePanel;
