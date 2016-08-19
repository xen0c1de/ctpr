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
  multiplierLumen: {
    type: Number,
    label: "Facteur -> cost Lumen",
    decimal: true
  },
  multiplierOthers: {
    type: Number,
    label: "Facteur -> cost Autres",
    decimal: true
  },
  multiplierClient: {
    type: Number,
    label: "Facteur -> cost détail",
    decimal: true
  }
});

Prices.attachSchema( PricesSchema );
