import React from 'react';
import PropTypes from 'prop-types';

import classes from './Grid.scss';

const squareLabel = props => (
  <div className={`${classes.Square} label`}>
    {props.value}
  </div>
);

squareLabel.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

export default squareLabel;
