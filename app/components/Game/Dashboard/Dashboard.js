import React from 'react';

import Chat from '../Chat';

class Dashboard extends React.Component {

	render() {
		let gameLink = `${window.location.protocol}//${window.location.host}/invite/${this.props.gameID}`;

		return (
			<div className="Dashboard">
        <h1>Welcome</h1>
        Invite your friend with following link:
        <input type="text" value={gameLink} readOnly />
        {this.props.gameID ? <Chat gameID={this.props.gameID} /> : null}
      </div>
		);
	}
}

export default Dashboard;
