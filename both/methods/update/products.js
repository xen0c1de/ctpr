Meteor.methods({
  updateProduct( options ) {
    check( options, {
      pn: String,
      desc: String,
      category: String,
      cost: Number,
      attributes: Array,
      powers: Array,
      colors: Array,
      ips: Array
    });

    try {
      Products.update( { pn: options.pn }, {
                        desc: product.desc,
                        category: product.category,
                        cost: product.cost,
                        attributes: product.attributes,
                        powers: product.powers,
                        colors: product.colors,
                        ips: product.ips
                      } );
    } catch( exception ) {
      return exception;
    }
  }
});
