import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import GameDashboard from '../../components/Game/Dashboard';
import GridControllerBattle from './GridControllerBattle';

import database from '../../database';
import gridContainer from '../../components/Grid/GridContainer';
import classes from './Game.scss';

class GameBattle extends React.Component {

  onFireHandler = (row, col) => {
    database.makeShot(this.props.gameID, this.props.userID, row, col);
    // alert('FIRE! Player: ' + player + ' /' + row + ':' + col);
  };

  listenGameData(gameID) {
    database.listenGameData(gameID, (snapshot) => {
      if (snapshot.exists()) {
        const gameData = snapshot.val();
        const {[this.props.userID]: userGrid, ...opponentGrid} = gameData.grids;
        console.log(userGrid);
        this.props.storeUserGrid(new gridContainer(userGrid));
        this.props.storeOpponentGrid(new gridContainer(opponentGrid));
      }
    });
  }

  componentDidMount() {
    this.listenGameData(this.props.gameID);
  };

  render() {
    if (this.props.userGrid && this.props.opponentGrid) {
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
  userGrid: PropTypes.object,
  opponentGrid: PropTypes.object,
  storeGameData: PropTypes.func.isRequired,
  storeUserGrid: PropTypes.func.isRequired,
  storeOpponentGrid: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  userID: state.auth.uid,
  userGrid: state.game.userGrid,
  opponentGrid: state.game.opponentGrid,
});

const mapDispatchToProps = dispatch => ({
  storeGameData: data => dispatch({ type: 'STORE_GAME_DATA', data }),
  storeUserGrid: data => dispatch({ type: 'STORE_USER_GRID', data }),
  storeOpponentGrid: data => dispatch({ type: 'STORE_OPPONENT_GRID', data }),
});

export default connect(mapStateToProps, mapDispatchToProps)(GameBattle);
