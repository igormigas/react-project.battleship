import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import GameController from './GameController';

import database from '../../database';
import { getInitialGridConfig } from '../../functions/initial';

class Game extends Component {
  state = {
    gameID: null,
    gameCreated: false,
    gameInitialized: false,
  };

  componentDidMount() {
    console.log('GAME mounted');

    this.theLoop(this.props.match.params.id);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('GAME updated');
    // console.log(prevProps, this.props)
    // console.log(prevState, this.state)

    if (!this.state.gameInitialized) {
      this.theLoop(this.props.match.params.id);
    }
  }

  getInitialGameConfig(gameID) {
    const timestamp = Date.now();
    const config = {};

    config.details = {
      id: gameID,
      time: {
        created: timestamp,
        modified: timestamp,
      },
    };

    config.details.players = {
      0: {
        id: this.props.userID,
        name: {
          first: this.props.userData.profile.firstName,
          last: this.props.userData.profile.lastName,
        },
        picture: {
          url: this.props.userData.profile.picture.url,
        },
      },
    };
    return Object.assign(getInitialGridConfig(), config);
  }

  createNewGameAndRedirect() {
    const gameID = database.getNewGameKey();
    const gameConfig = this.getInitialGameConfig(gameID);
    database.createNewGame(gameID, gameConfig);

    this.setState({
      gameCreated: gameID,
    });
    this.props.history.replace(`/game/${gameID}`);
  }

  dispatchGameConfig(gameConfig) {
    const players = gameConfig.players;
    const playersID = [
      players[0] ? players[0].id : null,
      players[1] ? players[1].id : null,
    ];

    if (playersID.includes(this.props.userID)) {
      console.log('PLAY');
      this.setState({
        gameInitialized: true,
        gameID: gameConfig.id,
      });
    } else if (
      (playersID[0] && !playersID[1])
      || (!playersID[0] && playersID[1])
    ) {
      console.log('DO YOU WANNA PLAY ?');
      this.props.history.replace(`/invite/${gameConfig.id}`);
    } else if (playersID[0] && playersID[1]) {
      console.log('PRIVATE GAME');
    } else {
      console.log('ERROR, PROBABLY BOTH NULL, PROBLEM WITH CREATING NEW GAME');
    }

    // this.props.storeGameID(gameID);
  }

  theLoop(urlGameID) {
    if (urlGameID) {
      database.checkGameExist(urlGameID, (result) => {
        if (!result.exists()) {
          this.createNewGameAndRedirect();
        } else {
          const gameConfig = result.val();
          this.dispatchGameConfig(gameConfig);
        }
      });
    } else {
      this.createNewGameAndRedirect();
    }
  }

  render() {
    return this.state.gameInitialized ? <GameController gameID={this.state.gameID} /> : null;
  }
}

Game.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  userID: PropTypes.string.isRequired,
  userData: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  userID: state.auth.uid,
  userData: state.auth.isAuth ? state.auth.data : null,
});

const mapDispatchToProps = dispatch => ({
  storeGameID: id => dispatch({ type: 'STORE_GAME_ID', id }),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Game));
