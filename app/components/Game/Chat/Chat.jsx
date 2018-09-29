import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import database from '../../../database';
import classes from './Chat.scss';

class Chat extends React.Component {
  state = {
    messages: [],
    inputValue: '',
  };

  componentDidMount() {
    database.getGameChat(this.props.gameID, (response) => {
      if (response.exists()) {
        const messages = response.val().messages || [];
        this.setState({
          messages: Object.keys(messages).map(key => ({ ...messages[key], id: key })),
        });
      }
    });
  }

  onInputChangeHandler = (e) => {
    this.setState({
      inputValue: e.target.value,
    });
  };

  onInputSubmitHandler = (e) => {
    if (e.key === 'Enter') {
      database.submitChatMessage(this.props.gameID, this.props.userID, e.target.value);
      this.setState({
        inputValue: '',
      });
    }
  };

  showMessages() {
    return this.state.messages.map(msg => <p key={msg.id}>{msg.message}</p>);
  }

  render() {
    return (
      <div className={classes.Chat}>
        <h3>Chat</h3>
        <div className={classes.messages}>
          {this.showMessages()}
        </div>
        <input
          type="text"
          className={classes.newMessage}
          onChange={this.onInputChangeHandler}
          onKeyPress={this.onInputSubmitHandler}
          value={this.state.inputValue}
          placeholder="Write your message..."
        />
      </div>
    );
  }
}

Chat.propTypes = {
  gameID: PropTypes.string.isRequired,
  userID: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  userID: state.auth.userID,
  gameData: state.game.gameData,
});

export default connect(mapStateToProps)(Chat);
