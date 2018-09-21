const functions = (database) => {
	return {
		checkGameExist: (gameID, callback) => {
			database
				.ref('/games/' + gameID)
				.once('value')
				.then( snapshot => callback(snapshot.exists()) );
		},

		getGameData: (gameID, callback) => {
			database
				.ref('/games/' + gameID)
				.on('value', snapshot => callback(snapshot) );
		},

		postGameData: (obj) => {
			const ref = database.ref('/games');
			const key = ref.push().key;
			ref.child(key).set(obj);
			return key;
		},

		makeShot: (gameID, turn, row, col) => {
			const updates = {};
			updates[`/fields/${row}/${col}/shot`] = true;
			updates['/turn'] = turn ? 0 : 1;
			database
				.ref(`/games/${gameID}`)
				.update(updates);
		},

		updateGameField: (gameID, row, col) => {
			database
				.ref(`/games/${gameID}/fields/${row}/${col}`)
				.update({
					shot: 'true'
				})
		}
	}
}

export default functions;






