const functions = database => ({

  updateUser: (obj) => {
    database
      .ref(`/users/${obj.id}`)
      .update(obj);
  },

  getTopUsers: (callback) => {
    database
      .ref('/users')
      .orderByChild('score')
      .limitToLast(3)
      .once('value')
      .then(snapshot => callback(snapshot.val()));
  },

});

export default functions;
