Ressources = new Meteor.Collection( 'ressources' );

Ressources.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Ressources.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

let RessourcesSchema = new SimpleSchema({
  categorie: {
    type: String,
    max: 100,
    label: "La catégorie de la ressources"
  },
  name: {
    type: String,
    label: "Le nom de la ressources",
    max: 50
  },
  email: {
    type: String,
    label: "Email de la ressources",
    max: 200,
    optional: true
  },
  address: {
    type: String,
    label: "Adresse de la ressources",
    max: 200,
    optional: true
  },
  phone: {
    type: String,
    label: "Téléphone de la ressources",
    max: 20,
    optional: true
  }
});

Ressources.attachSchema( RessourcesSchema );
