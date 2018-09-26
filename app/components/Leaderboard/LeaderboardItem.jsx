import React from 'react';

const leaderboardItem = (props) => (
  <li className="lbItem">
    <div className="lbImage">
      <img src={props.image} alt={props.name} />
    </div>
    <div className="lbName">{props.name}</div>
    <div className="lbScore">{props.score}</div>
  </li>
);

export default leaderboardItem;
