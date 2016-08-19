Meteor.publish( 'prices', function() {
  if (Roles.userIsInRole(this.userId, ['admin','managers'])){
    return Prices.find();
  }
});
