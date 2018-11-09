import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import ActiveGamesItem from './ActiveGamesItem';
import database from '../../database';

class ActiveGames extends React.Component {
  state = {
    activeGames: [],
  };

  onClickHandler = (gid) => {
    this.props.history.push('/game/' + gid);
  };

  componentDidMount() {
    database.getUserActiveGames(this.props.userID, (result) => {
      this.setState({
        activeGames: Object.keys(result.val()),
      });
    });
  }

  render() {
    const items = this.state.activeGames.length ? this.state.activeGames.map(gid => (
      <ActiveGamesItem
        key={gid}
        name={gid}
        onClickEvent={this.onClickHandler}
      />
    )) : null;

    return (
      <div className="ActiveGames">
        <h4>Your active games:</h4>
        {items}
      </div>
    );
  }
}

ActiveGames.propTypes = {
  userID: PropTypes.string.isRequired,
};

export default withRouter(ActiveGames);
