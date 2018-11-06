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
    const { gameID, userID, opponentID, nextShooterID } = this.props;
    if (nextShooterID === userID) {
      database.makeShot(gameID, opponentID, row, col);
      // DEBUG
      alert('FIRE! Player: ' + userID + ' /' + row + ':' + col);
    } else {
      alert('next player round');
    }
  };

  retrieveOpponentID = (players) => {
    for (let id in players) {
      if (id !== this.props.userID) {
        return id;
      }
    }
    return null;
  }

  initialize() {
    const { gameID, userID } = this.props;
    const { storeOpponentID, storeUserGrid, storeOpponentGrid, storeNextShooterID } = this.props;
    let opponentID = null;

    database.listenGamePlayers(gameID, response => {
      const count = Object.keys(response).length;
      if (count === 2) {
        opponentID = this.retrieveOpponentID(response);
        storeOpponentID(opponentID);
        database.stopListeningGamePlayers(gameID);
      }
    });

    database.listenGrids(gameID, response => {
      storeUserGrid(new gridContainer(response[userID]));
      if (opponentID) {
        storeOpponentGrid(new gridContainer(response[opponentID], true));
      }
      database.getNextShooterID(gameID, storeNextShooterID);
    });
  }

  componentDidMount() {
    this.initialize();
  };

  render() {
    const { gameID, userID, userGrid, opponentGrid  } = this.props;

    const userComponent = userGrid ? (
      <GridControllerBattle
        gridContainer={userGrid}
      />
    ) : 'Spinner';

    const opponentComponent = opponentGrid ? (
      <GridControllerBattle
        gridContainer={opponentGrid}
        clickEvent={this.onFireHandler}
      />
    ) : 'Spinner';

    if (userGrid) {
      return (
        <section className={classes.Game}>
          <GameDashboard gameID={gameID} />
          {userComponent}
          {opponentComponent}
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
  nextShooterID: PropTypes.string,
  userGrid: PropTypes.object,
  opponentGrid: PropTypes.object,
  storeOpponentID: PropTypes.func.isRequired,
  storeUserGrid: PropTypes.func.isRequired,
  storeOpponentGrid: PropTypes.func.isRequired,
  storeNextShooterID: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  userID: state.auth.uid,
  opponentID: state.game.opponentID,
  nextShooterID: state.game.nextShooterID,
  userGrid: state.game.userGrid,
  opponentGrid: state.game.opponentGrid,
});

const mapDispatchToProps = dispatch => ({
  storeOpponentID: id => dispatch({ type: 'STORE_OPPONENT_ID', id }),
  storeUserGrid: grid => dispatch({ type: 'STORE_USER_GRID', grid }),
  storeOpponentGrid: grid => dispatch({ type: 'STORE_OPPONENT_GRID', grid }),
  storeNextShooterID: id => dispatch({ type: 'STORE_NEXT_SHOOTER_ID', id })
});

export default connect(mapStateToProps, mapDispatchToProps)(GameBattle);
