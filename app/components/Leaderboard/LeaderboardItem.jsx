import React from 'react';
import PropTypes from 'prop-types';

import classes from './Leaderboard.scss';

const leaderboardItem = props => (
  <li className={classes.Item}>
    <div className={classes.Image}>
      <img src={props.pictureUrl} alt={props.name} />
    </div>
    <div className={classes.Name}>{props.name}</div>
    <div className={classes.Score}>{props.score}</div>
  </li>
);

leaderboardItem.propTypes = {
  name: PropTypes.string.isRequired,
  pictureUrl: PropTypes.string.isRequired,
  score: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
};

export default leaderboardItem;
