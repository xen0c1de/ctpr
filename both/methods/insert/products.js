Meteor.methods({
  addProduct( product ) {
    check( product, {
      pn: String,
      desc: String,
      category: String
    });

    try {
      Modules.server.addProduct({
        pn: product.pn,
        desc: product.desc,
        category: product.category,
        price: product.price,
        properties: product.properties
      });
    } catch( exception ) {
      return exception;
    }
  }
});
