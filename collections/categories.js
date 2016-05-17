Categories = new Meteor.Collection( 'categories' );

Categories.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Categories.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

let CategoriesSchema = new SimpleSchema({
  name: {
    type: String,
    label: "Identifiant de la catégorie",
    max: 100
  }
});

Categories.attachSchema( CategoriesSchema );
