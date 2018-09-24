import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import GameController from './GameController';

import database from '../../services/firebase/';
import { getInitialGameConfig } from '../../functions/initial';

class Game extends Component {

  state = {
    gameCreated: false,
    gameInitialized: false,
  }

  componentDidMount() {
    console.log('GAME mounted')

    this.theLoop(this.props.match.params.id);
  }

  componentDidUpdate() {
    console.log('GAME updated')

    this.theLoop(this.props.match.params.id);
  }

  theLoop(urlGameID) {
    if (this.state.gameCreated == urlGameID) {
      this.initGame(urlGameID);
    } else if (urlGameID) {
      database.checkGameExist(urlGameID, result => {
        if (!result) {
          this.createNewGameAndRedirect();
        } else {
          this.initGame(urlGameID);
        }
      });
    } else {
      this.createNewGameAndRedirect();
    }
  }



  /*shouldComponentUpdate(nextProps) {
    console.log(nextProps, this.props)
    console.log(nextProps.match.params.id !== this.props.match.params.id)
    return nextProps.match.params.id !== this.props.match.params.id;
  }*/

  createNewGameAndRedirect() {
    const initial = getInitialGameConfig();
    const gameID = database.postGameData(initial);
    this.setState({
      gameCreated: gameID
    })
    this.props.history.replace('/game/' + gameID);
  }

  initGame(gameID) {
    if (gameID && !this.state.gameInitialized) {
      this.setState({
        gameInitialized: true,
        gameID: gameID,
      })
      //this.props.storeGameID(gameID);
    }
  }

  render() {
    return this.state.gameID ? <GameController gameID={this.state.gameID} /> : null;
  }
}

const mapStateToProps = state => {
  return {
  }
}

const mapDispatchToProps = dispatch => {
  return {
    storeGameID: ( id ) => dispatch({type: 'STORE_GAME_ID', id})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Game));
