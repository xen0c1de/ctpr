Meteor.methods({
  acceptInvitation( user ) {
    check( user, {
      email: String,
      firstName: String,
      lastName: String,
      password: Object,
      token: String
    });

    try {
      var userId = Modules.server.acceptInvitation( user );
      return userId;
    } catch( exception ) {
      return exception;
    }
  }
});
