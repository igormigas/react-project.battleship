import React from 'react';
import { connect } from 'react-redux';

import Chat from '../Chat';

class Dashboard extends React.Component {

	render() {
		let gameLink = 'localhost:3000/game/' + this.props.gameID;

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

const mapStateToProps = state => {
  return {
    gameID: state.game.gameID
  }
}

export default connect(mapStateToProps)(Dashboard);
