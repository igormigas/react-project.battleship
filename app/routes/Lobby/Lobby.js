import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import ActiveGames from '../../components/ActiveGames';
import Leaderboard from '../../components/Leaderboard';
import NewGamePanel from '../../components/NewGamePanel';

class Lobby extends React.Component {

	componentDidMount() {

		/*
		ref.on('value', function(snapshot) {
			console.log('Firebase Read On', snapshot.val())
		})

		database.ref('/users/'+this.props.userID+1).update({
	  	email: 'elomelo',
	  	score: 0,
	  });

		ref.once('value').then(function(snapshot) {
		  console.log('Firebase Read Once', snapshot.val())
		});*/

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

const mapStateToProps = state => {
	return {
		userAuth: state.auth.userAuth,
		userID: state.auth.userID,
		userName: state.auth.userName,
	}
}

export default connect(mapStateToProps, null)(withRouter(Lobby));
