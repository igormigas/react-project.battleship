import React from 'react';
import PropTypes from 'prop-types';

import classes from './UserProfile.scss';

const UserProfileComponent = (props) => (
  <div className={classes.Profile}>
    <div className={classes.Photo}>
      <img
        src={props.pictureUrl}
        alt={props.displayName}
      />
    </div>
    <h3>
      {props.displayName}
      <br />
      <button onClick={props.onHomepageEvent}>HOME</button>
      <button onClick={props.onLogoutEvent}>LOGOUT</button>
    </h3>
  </div>
);

UserProfileComponent.propTypes = {
  displayName: PropTypes.string.isRequired,
  pictureUrl: PropTypes.string.isRequired,
  onHomepageEvent: PropTypes.func.isRequired,
  onLogoutEvent: PropTypes.func.isRequired,
};

export default UserProfileComponent;
