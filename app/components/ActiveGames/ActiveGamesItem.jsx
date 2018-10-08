import React from 'react';
import PropTypes from 'prop-types';

import classes from './ActiveGamesItem.scss';

const activeGamesItem = props => (
  <li
    className={classes.Item}
    onClick={() => props.onClickEvent(props.name)}
  >
    <div className={classes.Name}>{props.name}</div>
  </li>
);

activeGamesItem.propTypes = {
  name: PropTypes.string.isRequired,
  onClickEvent: PropTypes.func.isRequired,
};

export default activeGamesItem;
