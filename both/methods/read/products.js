Meteor.methods({
  calculatePRFL( products ) {
    check( products, {
      rowArray: Array,
      stripId: String,
      profileId: String,
      lensId: String,
      endcapId: String,
      bracketId: String,
      drivers: Array,
      userId:String
    });

    try {
      var result = Modules.server.calculatePRFL(products);
      return result;
    } catch( exception ) {
      return exception;
    }
  }
});
