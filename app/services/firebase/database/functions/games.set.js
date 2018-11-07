const functions = database => ({
  checkGameExist: (gameID, callback) => {
    database
      .ref(`/games/${gameID}/details`)
      .once('value')
      .then(snapshot => callback(snapshot.val()));
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

  createNewGame: (gameID, userID, obj) => {
    console.warn(obj);
    database
      .ref(`/games/${gameID}`)
      .set(obj);
    database
      .ref(`/users/${userID}/games/${gameID}`)
      .set(true);
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

  initUserPresenceSystem: (gameID, userID) => {
    const connectionsRef = database.ref(`users/${userID}/connections/${gameID}`);
    const lastOnlineRef = database.ref(`users/${userID}/lastOnline`);
    const connectedRef = database.ref('.info/connected');
    connectedRef.on('value', snapshot => {
      if (snapshot.val() === true) {
        connectionsRef.onDisconnect().remove();
        connectionsRef.set(true);
        lastOnlineRef.onDisconnect().set(Date.now() / 1000 | 0);
      }
    });
  },

  cancelUserPresenceSystem: (gameID, userID) => {
    const connectionsRef = database.ref(`users/${userID}/connections/${gameID}`);
    connectionsRef.onDisconnect().cancel();
    const connectedRef = database.ref('.info/connected');
    connectedRef.off();
  },

  opponentPresenceListener: (gameID, opponentID, callback) => {
    const connectionsRef = database.ref(`users/${opponentID}/connections/${gameID}`);
    connectionsRef.on('value', (snapshot) => {
      callback(snapshot.exists());
    });
  },

  cancelOpponentPresenceListener: (gameID, opponentID) => {
    const connectionsRef = database.ref(`users/${opponentID}/connections/${gameID}`);
    connectionsRef.off();
  },


});

export default functions;
