import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import GridBattleController from './GridBattleController';
import Dashboard from './components/Dashboard';
import PlayerHud from './components/PlayerHud';

import GameController from '../../../utils/GameController';
import database from '../../../database';
import classes from '../Game.scss';

class GameBattle extends React.Component {
  state = {
    isOpponentActive: false,
  };

  controller = new GameController();

  onFireHandler = (row, col) => {
    const { gameID, userID, opponentID, nextShooterID } = this.props;
    const controller = this.controller;

    if (nextShooterID !== userID) {
      alert('Next player round!');
      return false;
    }

    if (!controller.isNewShot(row, col)) {
      alert('There is no point to hit the same spot. Try a different one!');
    }

    const { damage, effect } = controller.applyDamage(row, col);
    if (damage) {
      database.updateShipsWithDamage(gameID, opponentID, damage);
    }
    database.updateGridWithShot(gameID, opponentID, row, col);
    database.changePlayerTurn(gameID, opponentID);

    this.setState(this.state);
    alert('FIRE! Player: ' + userID + ' /' + row + ':' + col);
  };

  retrieveOpponentID = (players) => {
    for (let id in players) {
      if (id !== this.props.userID) {
        return id;
      }
    }
    return null;
  };

  setOpponentState = (bool) => {
    this.setState({
      isOpponentActive: bool,
    });
  };

  initialize() {
    console.log(this);
    const { gameID, userID } = this.props;
    const { storeOpponentID, storeNextShooterID } = this.props;
    let opponentID = null;

    database.initGamePlayersListener(gameID, response => {
      const count = Object.keys(response).length;
      if (count === 2) {
        opponentID = this.retrieveOpponentID(response);
        storeOpponentID(opponentID);
        database.cancelGamePlayersListener(gameID);
        database.initUserPresenceListener(gameID, userID);
        database.initOpponentPresenceListener(gameID, opponentID, this.setOpponentState);
      }
    });

    database.initGridsListener(gameID, ({ grids, ships }) => {
      this.controller.storeUserGrid(grids[userID]);
      this.controller.storeUserShips(ships[userID]);
      if (opponentID) {
        this.controller.storeOpponentGrid(grids[opponentID]);
        this.controller.storeOpponentShips(ships[opponentID]);
      }
      database.getNextShooterID(gameID, id => {
        storeNextShooterID(id);
      });
      this.setState(this.state);
    });
  }

  componentDidMount() {
    this.initialize();
  }

  componentWillUnmount() {
    const { gameID, opponentID, clearGameStateMemory } = this.props;

    database.cancelUserPresenceListener(gameID, opponentID);
    database.cancelOpponentPresenceListener(gameID, opponentID);
    database.cancelGridsListener(gameID);
    clearGameStateMemory();
  }

  render() {
    const { gameID, userID, opponentID } = this.props;
    const { isOpponentActive } = this.state;
    const userGrid = this.controller.getUserGrid();
    const opponentGrid = this.controller.getOpponentGrid();

    const userComponent = userGrid ? (
      <GridBattleController
        grid={userGrid}
      />
    ) : 'Spinner';

    const opponentComponent = opponentGrid ? (
      <GridBattleController
        grid={opponentGrid}
        clickEvent={this.onFireHandler}
      />
    ) : 'Spinner';

    const playerHud = (
      <PlayerHud
        uid={opponentID}
        name={'Opponent'}
        isActive={isOpponentActive}
      />
    );

    if (userGrid) {
      return (
        <section className={classes.Game}>
          <Dashboard gameID={gameID} />
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
  storeOpponentID: PropTypes.func.isRequired,
  storeNextShooterID: PropTypes.func.isRequired,
  clearGameStateMemory: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  userID: state.auth.uid,
  opponentID: state.game.opponentID,
  nextShooterID: state.game.nextShooterID,
});

const mapDispatchToProps = dispatch => ({
  storeOpponentID: id => dispatch({ type: 'STORE_OPPONENT_ID', id }),
  storeNextShooterID: id => dispatch({ type: 'STORE_NEXT_SHOOTER_ID', id }),
  clearGameStateMemory: () => dispatch({ type: 'CLEAR_GAME_MEMORY' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(GameBattle);
