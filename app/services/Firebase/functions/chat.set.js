const functions = (database) => {
	return {
		getGameChat: (gameID, callback) => {
			database
				.ref(`/chats/${gameID}`)
				.on('value', snapshot => callback(snapshot) );
		},

		createGameChat: (gameID) => {
			database
				.ref(`/chats/${gameID}`)
				.set({
					id: gameID
				});
		},

		submitChatMessage: (gameID, userID, message) => {
			const timestamp = Date.now();
			database
				.ref(`/chats/${gameID}/messages/${timestamp}`)
				.set({ userID, message });
		}
	}
}

export default functions;
