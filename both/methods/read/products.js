Meteor.methods({
  calculateDrivers( products ) {
    check( products, {
      rowArray: Array,
      pn: String,
      drivers: Array
    });

    try {
      var drivers = Modules.server.calculateDrivers(products);
      return drivers;
    } catch( exception ) {
      return exception;
    }
  }
});
