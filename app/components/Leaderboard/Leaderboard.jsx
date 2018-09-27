import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

import LeaderboardItem from './LeaderboardItem';
import database from '../../services/Firebase';

class Leaderboard extends React.Component {
  componentDidMount() {
    database.getTopUsers((result) => {
      this.props.updateTopUsers(_.toArray(result));
    });
  }

  render() {
    const items = this.props.topUsers.length ? this.props.topUsers.map(user => (
      <LeaderboardItem
        key={user.id}
        name={user.firstName + ' ' + user.lastName}
        score={user.score}
        image={user.picture.url || null}
      />
    )) : null;

    return (
      <ul className="Leaderboard">
        <h4>Top players:</h4>
        {items}
      </ul>
    );
  }
}

Leaderboard.propTypes = {
  topUsers: PropTypes.array,
  updateTopUsers: PropTypes.func,
};

const mapStateToProps = state => ({
  topUsers: state.app.topUsers,
});

const mapDispatchToProps = dispatch => ({
  updateTopUsers: topUsers => dispatch({ type: 'UPDATE_TOP_USERS', topUsers }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Leaderboard);
