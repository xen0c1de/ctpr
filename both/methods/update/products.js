Meteor.methods({
  updateProduct( options ) {
    check( options, {
      pn: String,
      desc: String,
      category: String,
      price: Number,
      properties: [Number]
    });

    try {
      Products.update( options.pn, { desc: options.desc, category: options.category, price: options.price, properties: options.properties } );
    } catch( exception ) {
      return exception;
    }
  }
});
