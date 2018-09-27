import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import ActiveGames from '../../components/ActiveGames';
import Leaderboard from '../../components/Leaderboard';
import NewGamePanel from '../../components/NewGamePanel';

class Lobby extends React.Component {
  componentDidMount() {

  }

  render() {
    return (
      <section className="Lobby">
        <NewGamePanel history={this.props.history} />
        <ActiveGames />
        <Leaderboard />
      </section>
    );
  }
}

Lobby.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  userData: PropTypes.object,
};

const mapStateToProps = state => ({
  userData: {
    id: state.auth.userID,
    firstName: state.auth.userFirstName,
    lastName: state.auth.userLastName,
    picture: state.auth.userPicture,
  },
});

export default connect(mapStateToProps)(withRouter(Lobby));
