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
      Products.update( { pn: options.pn }, { $set: {
                        desc: options.desc,
                        category: options.category,
                        cost: options.cost,
                        attributes: options.attributes,
                        powers: options.powers,
                        colors: options.colors,
                        ips: options.ips
                      }});
    } catch( exception ) {
      return exception;
    }
  }
});
