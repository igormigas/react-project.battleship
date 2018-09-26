import React from 'react';
import { connect } from 'react-redux';

import database from '../../services/firebase/';
//import classes from './Invite.scss'

class Invite extends React.Component {

  state = {
    showInvitation: null,
    emptySlot: null
  }

  componentDidMount() {
    database.getGamePlayers(this.props.match.params.id, response => {
      if (!response.exists()) {
        // Error in game config in database
        this.props.history.replace('/lobby');
      } else {
        response = response.val();
        const playersID = response ? [
          response[0] ? response[0].id : null,
          response[1] ? response[1].id : null
        ] : [];

        if (this.props.userData.id && playersID.includes(this.props.userData.id)) {
          this.redirectToGame();
        } else if (this.isOneNull(playersID[0], playersID[1])) {
          this.setState({
            showInvitation: true,
            emptySlot: playersID[0] ? 1 : 0,
          })
        } else {
          this.setState({
            showInvitation: false
          })
        }
      }
    })
  }

  onAcceptHandler = () => {
    database.createOpponent(this.props.match.params.id, this.state.emptySlot, {
      id: this.props.userData.id,
      name: {
        first: this.props.userData.firstName,
        last: this.props.userData.lastName,
      },
      picture: {
        url: this.props.userData.picture.data.url
      }
    })
    .then(this.redirectToGame);
  }

  onRefuseHandler = () => {
    this.props.history.push('/');
  }

  redirectToGame = () => {
    this.props.history.replace('/game/' + this.props.match.params.id);
  }

  isOneNull = (...args) => {
    console.log(args)
    //return (args[0] && !args[1]) || (!args[0] && args[1]);
    const nulls = args.reduce( (prev, next) => {
      return next === null ? prev + 1 : prev;
    }, 0);
    return nulls === 1 ? true : false;
  }

  render() {
    let content;
    switch(this.state.showInvitation) {
      case true:
      content = (
        <div>
          Czy chcesz dołączyć do gry?
          <button onClick={this.onAcceptHandler}>Yes!</button>
          <button onClick={this.onRefuseHandler}>Naah..</button>
        </div>
      );
      break;

      case false:
      content = (
        <div>
          Nie ma, zajęte!
        </div>
      )
      break;

      default:
      content = 'Spinner';
    }

    return (
      <div>
        {content}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userData: {
      id: state.auth.userID,
      firstName: state.auth.userFirstName,
      lastName: state.auth.userLastName,
      picture:  state.auth.userPicture,
    }
  }
}

export default connect(mapStateToProps)(Invite);
