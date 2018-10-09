const functions = database => ({
  checkGameExist: (gameID, callback) => {
    database
      .ref(`/games/${gameID}/details`)
      .once('value')
      .then(snapshot => callback(snapshot));
  },

  getGameData: (gameID, callback) => {
    database
      .ref(`/games/${gameID}`)
      .once('value')
      .then(snapshot => callback(snapshot));
  },

  listenGameState: (gameID, callback) => {
    database
      .ref(`/games/${gameID}/state`)
      .on('value', snapshot => callback(snapshot));
  },

  getGameDetails: (gameID, callback) => {
    database
      .ref(`/games/${gameID}/details`)
      .once('value')
      .then(snapshot => callback(snapshot));
  },

  getGamePlayers: (gameID, callback) => {
    database
      .ref(`/games/${gameID}/details/players`)
      .once('value')
      .then(snapshot => callback(snapshot));
  },

  getNewGameKey: () => {
    const ref = database.ref('/games');
    const key = ref.push().key;
    return key;
  },

  createNewGame: (gameID, obj) => {
    database
      .ref('/games')
      .child(gameID)
      .set(obj);
  },

  registerUser: (gameID, userID) => {
    database
      .ref(`/users/${userID}/games`)
      .set({
        [gameID]: true,
      });
  },

  createOpponent: (gameID, slot, obj) => database
    .ref(`/games/${gameID}/details/players/${slot}`)
    .update(obj),

  listenGameData: (gameID, callback) => {
    database
      .ref(`/games/${gameID}`)
      .on('value', snapshot => callback(snapshot));
  },


  makeShot: (gameID, userID, row, col) => {
    const updates = {};
    updates[`/grids/${userID}/${row}/${col}/shot`] = true;
    updates['/lastShot'] = userID;
    database
      .ref(`/games/${gameID}`)
      .update(updates);
  },

  getPlayerGrid: (gameID, userID, callback) => {
    database
      .ref(`/games/${gameID}/grids/${userID}`)
      .once('value')
      .then(snapshot => callback(snapshot.exists() ? snapshot.val() : false));
  },

  savePlayerGrid: (gameID, userID, grid) => {
    return database
      .ref(`/games/${gameID}/grids/${userID}`)
      .update(grid);
  },

  setGameStateDeployed: (gameID, userID) => {
    database
      .ref(`/games/${gameID}/state/deployed/${userID}`)
      .set(true);
  },
});

export default functions;
