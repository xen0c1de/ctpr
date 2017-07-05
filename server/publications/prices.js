Meteor.publish( 'prices', function() {
  if (Roles.userIsInRole(this.userId, ['admin','manager'])){
    return Prices.find();
  }else{
    return false;
  }
});
