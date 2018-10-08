import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import GameController from './GameController';
import GameCreator from './GameCreator';

import database from '../../database';

class GameLauncher extends React.Component {

	state = {
		gameGridCreated: false,
	}

	componentDidMount() {
		database.getGameState(this.props.gameID, response => {
			if (response.created) {
				alert('created');
			} else {
				alert('not created');
			}
		});
  }

	render() {
		return this.state.gameGridCreated
			? <GameController gameID={this.props.gameID} />
			: <GameCreator gameID={this.props.gameID} />;
	}
}

GameLauncher.propTypes = {
	gameID: PropTypes.string.isRequired,
}

export default GameLauncher;
