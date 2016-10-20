Meteor.methods({
  updatePrices( options ) {
    check( options, {
      id: String,
      multiplierNRG: Number,
      multiplierMaster: Number,
      multiplierProvincial: Number,
      multiplierRegional: Number,
      multiplierClient: Number
    });

    try {
      Products.update( options.id, { $set: {
                        multiplierNRG: options.multiplierNRG,
                        multiplierMaster: options.multiplierMaster,
                        multiplierProvincial: options.multiplierProvincial,
                        multiplierRegional: options.multiplierRegional,
                        multiplierClient: options.multiplierClient
                      }});
    } catch( exception ) {
      return exception;
    }
  }
});
