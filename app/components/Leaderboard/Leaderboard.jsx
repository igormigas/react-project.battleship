import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

import LeaderboardItem from './LeaderboardItem';
import database from '../../services/firebase/';

class Leaderboard extends React.Component {

  componentDidMount() {
    database.getTopUsers( result => {
      this.props.updateTopUsers(_.toArray(result));
    })
  }

  render() {

    let items = this.props.topUsers.length ? this.props.topUsers.map( user => (
      <LeaderboardItem
        key={user.id}
        name={user.name}
        score={user.score}
        image={user.picture.data.url ? user.picture.data.url : null} />
    )) : null;

    return (
      <ul className="Leaderboard">
        <h4>Top players:</h4>
        {items}
      </ul>
    );
  }
};

const mapStateToProps = state => {
  return {
    topUsers: state.app.topUsers,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateTopUsers: ( topUsers ) => dispatch({type: 'UPDATE_TOP_USERS', topUsers}),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Leaderboard);
