const functions = database => ({

  createNewUser: (obj) => {
    database
      .ref('users')
      .child(obj.uid)
      .set({
        ...obj,
        gameData: {
          score: 0,
        },
      });
  },

  updateUser: (obj) => {
    database
      .ref('users')
      .child(obj.uid)
      .update(obj);
  },

  getUserData: (uid, callback) => {
    database
      .ref(`/users/${uid}`)
      .once('value')
      .then(s => s.val())
      .then(callback);
  },

  getTopUsers: (callback) => {
    database
      .ref('/users')
      .orderByChild('gameData/score')
      .limitToLast(5)
      .once('value')
      .then(snapshot => {
        const array = [];
        snapshot.forEach(childSnap => {
          const child = childSnap.val();
          array.push({
            uid: child.uid,
            displayName: child.userData.displayName,
            firstName: child.userData.firstName,
            lastName: child.userData.lastName,
            pictureUrl: child.userData.pictureUrl,
            score: child.gameData.score,
          });
        });
        callback(array.reverse());
      });
  },

  updateLastLoginTimestamp: (uid) => {
    database
      .ref(`/users/${uid}/userData`)
      .update({
        lastVisited: new Date() / 1000 | 0,
      });
  },

});

export default functions;
