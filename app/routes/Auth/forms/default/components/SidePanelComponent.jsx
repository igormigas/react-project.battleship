import React from 'react';
import PropTypes from 'prop-types';

import classes from './SidePanelComponent.scss';

const sidePanelComponent = (props) => {
  let header, description, toggler;

  if (props.signUp) {
    header = 'Sign up';
    description = 'Join the game and challange your friends';
    toggler = 'Sign in';
  } else {
    header = 'Sign in';
    description = 'Continue your challange';
    toggler = 'Sign up';
  }


  return (
    <div className={classes.SidePanel}>
      <div className={classes.TopContent}>
        <h2>{header}</h2>
        <p>{description}</p>
      </div>
      <div className={classes.BottomContent}>
        <button
          className={classes.Button}
          onClick={props.onToggleModeEvent}
        >
          {toggler}
        </button>
      </div>
    </div>
  );
};

sidePanelComponent.propTypes = {
  signUp: PropTypes.bool.isRequired,
  onToggleModeEvent: PropTypes.func.isRequired,
};

export default sidePanelComponent;
