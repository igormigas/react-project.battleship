import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import GameDashboard from '../../../components/Game/Dashboard';
import GridControllerBattle from './GridControllerBattle';

import database from '../../../database';
import classes from '../Game.scss';
import gridContainer from '../../../components/Grid/GridContainer';

class GameBattle extends React.Component {

  onFireHandler = (row, col) => {
    database.makeShot(this.props.gameID, this.props.opponentID, row, col);
    alert('FIRE! Player: ' + this.props.userID + ' /' + row + ':' + col);
  };

  run(gameID) {
    database.getGamePlayers(gameID, response => {
      const userID = this.props.userID;
      let opponentID;
      console.log(response);
      for (let id in response) {
        if (id !== this.props.userID) {
          opponentID = id;
          this.props.storeOpponentID(opponentID);
        }
      }

      database.listenGrids(gameID, response => {
        alert('changes');
        this.props.storePlayersGrids(
          new gridContainer(response[userID]),
          new gridContainer(response[opponentID])
        );
      })
    });


  }

  componentDidMount() {
    this.run(this.props.gameID);
  };

  render() {
    if (this.props.userGrid) {
      const userID = this.props.userID;
      const gameID = this.props.gameID;

      return (
        <section className={classes.Game}>
          <GameDashboard gameID={gameID} />
          <GridControllerBattle
            gridContainer={this.props.userGrid}
            clickEvent={this.onFireHandler}
          />
          <GridControllerBattle
            gridContainer={this.props.opponentGrid}
            clickEvent={this.onFireHandler}
          />
        </section>
      );
    }
    return null;
  }
}

GameBattle.propTypes = {
  gameID: PropTypes.string.isRequired,
  userID: PropTypes.string,
  opponentID: PropTypes.string,
  userGrid: PropTypes.object,
  opponentGrid: PropTypes.object,
  storeGameData: PropTypes.func.isRequired,
  storeOpponentID: PropTypes.func.isRequired,
  storePlayersGrids: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  userID: state.auth.uid,
  opponentID: state.game.opponentID,
  userGrid: state.game.userGrid,
  opponentGrid: state.game.opponentGrid,
});

const mapDispatchToProps = dispatch => ({
  storeGameData: data => dispatch({ type: 'STORE_GAME_DATA', data }),
  storeOpponentID: id => dispatch({ type: 'STORE_OPPONENT_ID', id }),
  storePlayersGrids: (userGrid, opponentGrid) => dispatch({ type: 'STORE_PLAYERS_GRIDS', grids: {userGrid, opponentGrid} }),
});

export default connect(mapStateToProps, mapDispatchToProps)(GameBattle);
