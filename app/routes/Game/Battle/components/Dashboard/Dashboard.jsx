import React from 'react';
import PropTypes from 'prop-types';

import Chat from '../../../Chat';

const Dashboard = ({ gameID }) => {
  const gameLink = `${window.location.protocol}//${window.location.host}/invite/${gameID}`;

  return (
    <div className="Dashboard">
      <h1>Welcome</h1>
      Invite your friend with following link:
      <input type="text" value={gameLink} readOnly />
      {gameID ? <Chat gameID={gameID} /> : null}
    </div>
  );
};

Dashboard.propTypes = {
  gameID: PropTypes.string.isRequired,
};

export default Dashboard;
