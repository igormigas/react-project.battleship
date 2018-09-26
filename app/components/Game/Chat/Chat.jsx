import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

import database from '../../../services/firebase/';
import classes from './Chat.scss';

class Chat extends React.Component {

  state = {
    messages: [],
    inputValue: '',
  }

  componentDidMount() {
    database.getGameChat( this.props.gameID, response => {
      if (response.exists()) {
        let messages = response.val().messages || [];
        this.setState({
          messages: Object.keys(messages).map( (key,i) => {
            return {...messages[key], id: key};
          })
        })
      }
    });
  }

  onInputChangeHandler = (e) => {
    this.setState({
      inputValue: e.target.value
    })
  }

  onInputSubmitHandler = (e) => {
    if (e.key === 'Enter') {
      const message = e.target.value;
      database.submitChatMessage(this.props.gameID, this.props.userID, e.target.value);
      this.setState({
        inputValue: ''
      })
    }
  }

  showMessages() {
    return this.state.messages.map( msg => {
      return <p key={msg.id}>{msg.message}</p>;
    });
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
          placeholder="Write your message..." />
      </div>
    );
  }
}

Chat.propTypes = {
  gameID: PropTypes.string.isRequired
}

const mapStateToProps = state => {
  return {
    userID: state.auth.userID,
    gameData: state.game.gameData,
  }
}

export default connect(mapStateToProps)(Chat);
