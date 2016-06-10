Meteor.publish( 'product', function( pn ) {
  check( pn, String );
  return Products.find( { "pn": pn } );
});
