import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import GameDashboard from '../../components/Game/Dashboard';
import Grid from '../../components/Grid';
import database from '../../services/firebase/';
import { getInitialGameConfig } from '../../functions/initial';

import classes from './Game.scss';

class Game extends Component {

  componentDidMount() {
    console.log('GAME mounted')

    const urlGameID = this.props.match.params.id;
    let gameID;

    if (urlGameID) {
      database.checkGameExist(urlGameID, result => {
        if (!result) {
          this.createNewGameAndRedirect();
        } else {
          gameID = urlGameID;
          alert('aaaaaaa')
          this.initGame(gameID);
        }
      });
    } else {
      this.createNewGameAndRedirect();
    }
  }

  componentDidUpdate() {
    console.log('GAME updated')

  }



  /*shouldComponentUpdate(nextProps) {
    console.log(nextProps, this.props)
    console.log(nextProps.match.params.id !== this.props.match.params.id)
    return nextProps.match.params.id !== this.props.match.params.id;
  }*/

  createNewGameAndRedirect() {
    const initial = getInitialGameConfig();
    const gameID = database.postGameData(initial);
    this.props.history.replace('/game/' + gameID);
  }

  initGame(gameID) {
    if (gameID) {
      this.props.storeGameID(gameID);
      this.listenGameData(gameID);
    }
  }

  listenGameData(gameID) {
    database.getGameData(gameID, snapshot => {
      if (snapshot.exists()) {
        this.props.storeGameData(snapshot.val());
      }
    });
  }

  render() {
    if (this.props.gameData) {
      const {gameID, ...gameData} = this.props.gameData

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
    userID: state.auth.userID,
    gameData: state.game.gameData,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    storeGameID: ( id ) => dispatch({type: 'STORE_GAME_ID', id}),
    storeGameData: ( data ) => dispatch({type: 'STORE_GAME_DATA', data}),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Game));
