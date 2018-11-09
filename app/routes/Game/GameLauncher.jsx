import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import GameBattle from './Battle/GameBattle';
import GameCreator from './Creator/GameCreator';

import database from '../../database';

class GameLauncher extends React.Component {
  state = {
    launch: null,
    deployed: null,
  };

  onGameStateChange = (response) => {
    const gameState = response.val();
    this.setState({
      launch: true,
      deployed: gameState.deployed[this.props.userID],
    });
  };

  componentDidMount() {
    database.listenGameState(this.props.gameID, this.onGameStateChange);
  }

  render() {
    if (this.state.launch) {
      return this.state.deployed
        ? <GameBattle gameID={this.props.gameID} />
        : <GameCreator gameID={this.props.gameID} />;
    }
    return null;
  }
}

GameLauncher.propTypes = {
  gameID: PropTypes.string.isRequired,
  userID: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  userID: state.auth.uid,
});

export default connect(mapStateToProps)(GameLauncher);
