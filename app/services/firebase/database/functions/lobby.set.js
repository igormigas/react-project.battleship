const functions = database => ({

	getUserActiveGames: (uid, callback) => {
    database
      .ref(`/users/${uid}/games`)
      .once('value')
      .then(callback);
  },
});

export default functions;
