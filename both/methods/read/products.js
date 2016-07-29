Meteor.methods({
  calculatePRFL( products ) {
    check( products, {
      rowArray: Array,
      pn: String,
      drivers: Array
    });

    try {
      var drivers = Modules.server.calculatePRFL(products);
      return drivers;
    } catch( exception ) {
      return exception;
    }
  }
});
