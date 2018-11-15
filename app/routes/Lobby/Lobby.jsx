import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import ActiveGames from './ActiveGames';
import Leaderboard from '../../components/Leaderboard';
import NewGamePanel from '../../components/NewGamePanel';

import classes from './Lobby.scss';

class Lobby extends React.Component {
  render() {
    return (
      <section className={classes.Lobby}>
        <div className={classes.NewGamePanel}>
          <NewGamePanel history={this.props.history} />
        </div>
        <div className={classes.ActiveGames}>
          <ActiveGames userID={this.props.userID} />
        </div>
        <div className={classes.Leaderboard}>
          <Leaderboard />
        </div>
      </section>
    );
  }
}

Lobby.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  userID: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  userID: state.auth.uid,
});

export default connect(mapStateToProps)(withRouter(Lobby));
