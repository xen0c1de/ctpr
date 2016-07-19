Meteor.publish( 'products', function() {
  return Products.find({}, {fields: {price: 0}});
});
