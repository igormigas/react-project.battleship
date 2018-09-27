import React from 'react';
import PropTypes from 'prop-types';

const leaderboardItem = props => (
  <li className="lbItem">
    <div className="lbImage">
      <img src={props.image} alt={props.name} />
    </div>
    <div className="lbName">{props.name}</div>
    <div className="lbScore">{props.score}</div>
  </li>
);

leaderboardItem.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  score: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
};

export default leaderboardItem;
