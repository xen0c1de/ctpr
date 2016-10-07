Prices = new Meteor.Collection( 'prices' );

Prices.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Prices.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

let PricesSchema = new SimpleSchema({
  multiplierNRG: {
    type: Number,
    label: "Facteur -> cost NRG",
    decimal: true
  },
  multiplierMaster: {
    type: Number,
    label: "Facteur -> cost Master",
    decimal: true
  },
  multiplierProvincial: {
    type: Number,
    label: "Facteur -> cost Provincial",
    decimal: true
  },
  multiplierRegional: {
    type: Number,
    label: "Facteur -> cost Regional",
    decimal: true
  },
  multiplierClient: {
    type: Number,
    label: "Facteur -> cost détail",
    decimal: true
  }
});

Prices.attachSchema( PricesSchema );
