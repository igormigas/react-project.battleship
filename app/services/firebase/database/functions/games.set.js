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
      .then(snapshot => callback(snapshot.val()));
  },

  listenGamePlayers: (gameID, callback) => {
    database
      .ref(`/games/${gameID}/details/players`)
      .on('value', snapshot => callback(snapshot.val()));
  },

  stopListeningGamePlayers: (gameID) => {
    database
      .ref(`/games/${gameID}/details/players`)
      .off();
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

  createOpponent: (gameID, userID, obj) => database
    .ref(`/games/${gameID}/details/players/${userID}`)
    .set(obj),

  getGameData: (gameID, callback) => {
    database
      .ref(`/games/${gameID}`)
      .once('value')
      .then(snapshot => callback(snapshot.val()));
  },

  makeShot: (gameID, targetID, row, col) => {
    const updates = {};
    updates[`/grids/${targetID}/${row}/${col}/shot`] = true;
    updates['/nextShooter'] = targetID;
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

  listenGrids: (gameID, callback) => {
    database
      .ref(`/games/${gameID}/grids`)
      .on('value', snapshot => callback(snapshot.val()));
  },

  getNextShooterID: (gameID, callback) => {
    database
      .ref(`/games/${gameID}/nextShooter`)
      .once('value')
      .then(snapshot => callback(snapshot.exists() ? snapshot.val() : null));
  },
});

export default functions;
