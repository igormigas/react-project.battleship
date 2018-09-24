import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import GameDashboard from '../../components/Game/Dashboard';
import Grid from '../../components/Grid';

import database from '../../services/firebase/';
import classes from './Game.scss';

class GameController extends React.Component {

	static propTypes = {
		gameID: PropTypes.string.isRequired
	}

	componentDidMount() {
  	this.listenGameData(this.props.gameID)
  }

  listenGameData(gameID) {
    database.listenGameData(gameID, snapshot => {
      if (snapshot.exists()) {
        this.props.storeGameData(snapshot.val());
      }
    });
  }

	render() {
    if (this.props.gameData) {
      const gameData = this.props.gameData;
      const gameID = this.props.gameID;

			return (
				<section className={classes.Game}>
	        <GameDashboard />
	        <Grid
	          active={gameData.turn == 0}
	          gameID={gameID}
	          fields={gameData.player[0].grid} />
	        <Grid
	          active={gameData.turn == 1}
	          gameID={gameID}
	          fields={gameData.player[1].grid} />
	      </section>
			);
		}
		return null;
	}
}

const mapStateToProps = state => {
  return {
    gameData: state.game.gameData,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    storeGameData: ( data ) => dispatch({type: 'STORE_GAME_DATA', data}),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameController);
