Meteor.methods({
  removeProduct( pn ) {
    check( pn, String );

    try {
      Products.remove( pn );
    } catch( exception ) {
      return exception;
    }
  }
});
