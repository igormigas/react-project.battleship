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

  state = {
    verifyUser: false
  }

  componentDidMount() {
    this.listenGameData(this.props.gameID)
  }

  componentDidUpdate() {

  }

  listenGameData(gameID) {
    database.listenGameData(gameID, snapshot => {
      if (snapshot.exists()) {
        this.props.storeGameData(snapshot.val());
      }
    });
  }

  onFireHandler = (player, row, col) => {
    database.makeShot(this.props.gameID, player, row-1, col-1);
    //alert('FIRE! Player: ' + player + ' /' + row + ':' + col);
  }

  onMouseEnterSquareHandler = (row, col) => {
    this.setState({
      hovering: true,
      hoverRow: row,
      hoverCol: col,
    })
  }

  onMouseLeaveSquareHandler = () => {
    this.setState({
      hovering: false
    })
  }

  render() {
    if (this.props.gameData) {
      const gameData = this.props.gameData;
      const gameID = this.props.gameID;
      console.log(gameData.grids[0].fields)

      return (
        <section className={classes.Game}>
          <GameDashboard gameID={gameID} />
          <Grid
            player={0}
            active={gameData.turn == 0}
            gameID={gameID}
            fields={gameData.grids[0].fields}
            clickEvent={this.onFireHandler}
            mouseEnterEvent={this.onMouseEnterSquareHandler}
            mouseLeaveEvent={this.onMouseLeaveSquareHandler} />
          <Grid
            player={1}
            active={gameData.turn == 1}
            gameID={gameID}
            fields={gameData.grids[1].fields}
            clickEvent={this.onFireHandler}
            mouseEnterEvent={this.onMouseEnterSquareHandler}
            mouseLeaveEvent={this.onMouseLeaveSquareHandler} />
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
