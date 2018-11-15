import React from 'react';
import PropTypes from 'prop-types';

import classes from './ActiveGamesItem.scss';

const activeGamesItem = props => {
	const { gid, playerName, onClickEvent } = props;
  const name = playerName || 'pending..';

  return (
  	<li
	    className={classes.Item}
	    onClick={() => onClickEvent(gid)}
	  >
	    <div className={classes.Name}>{name}dfs<br />{gid}</div>
	  </li>
	);
};

activeGamesItem.propTypes = {
  gid: PropTypes.string.isRequired,
  playerName: PropTypes.string,
  onClickEvent: PropTypes.func.isRequired,
};

export default activeGamesItem;
