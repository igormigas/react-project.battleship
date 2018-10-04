import React from 'react';

import LeaderboardItem from './LeaderboardItem';
import database from '../../database';

import classes from './Leaderboard.scss';

class Leaderboard extends React.Component {
  state = {
    topUsers: [],
  };

  componentDidMount() {
    database.getTopUsers((result) => {
      this.setState({
        topUsers: result,
      });
    });
  }

  render() {
    const items = this.state.topUsers.length ? this.state.topUsers.map(user => (
      <LeaderboardItem
        key={user.uid}
        name={user.displayName}
        score={user.score}
        pictureUrl={user.pictureUrl || 'https://robohash.org/' + user.uid}
      />
    )) : null;

    return (
      <ul>
        <h4>Top players:</h4>
        {items}
      </ul>
    );
  }
}

export default Leaderboard;
