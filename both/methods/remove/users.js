Meteor.methods({
  deleteUser( userId ) {
    check( userId, String );

    try {
      Meteor.users.remove( userId );
    } catch( exception ) {
      return exception;
    }
  }
});
