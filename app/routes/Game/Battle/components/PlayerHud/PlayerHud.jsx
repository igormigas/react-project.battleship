import React from 'react';
import PropTypes from 'prop-types';

const PlayerHud = (props) => {
  const activityStatus = props.isActive ? 'Online' : 'Offline';

  return (
    <div className="PlayerHud">
      <h1>{props.name}</h1>
      {activityStatus}
    </div>
  );
}

PlayerHud.propTypes = {
  uid: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
};

export default PlayerHud;
