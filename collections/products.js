Products = new Meteor.Collection( 'products' );

Products.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Products.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

let ProductsSchema = new SimpleSchema({
  pn: {
    type: String,
    label: "Numéro de produit",
    max: 200
  },
  desc: {
    type: String,
    label: "Description courte du produit"
  },
  category: {
    type: String,
    label: "Catégorie du produit",
    max: 100
  },
  price: {
    type: Number,
    label: "Prix du produit",
    decimal: true
  },
  attributes: {
    type: [String]
  },
  powers: {
    type: [String]
  },
  colors: {
    type: [String]
  },
  ips: {
    type: [String]
  }
});

Products.attachSchema( ProductsSchema );
