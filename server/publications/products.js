Meteor.publish( 'products', function() {
  if (Roles.userIsInRole(this.userId, ['admin','managers'])){
    return Products.find();
  }else{
    return Products.find({}, {fields: {cost: 0}});
  }
});
