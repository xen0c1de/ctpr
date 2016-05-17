Template.ressources.onCreated( () => {
  Template.instance().subscribe( 'ressources' );
  Template.instance().subscribe( 'categories' );
});

Template.ressources.helpers({
  ressources: function() {
    var ressources = Meteor.ressources.find();

    if ( ressources ) {
      return ressources;
    }
  },
  categories: function() {
    var categories = Meteor.categories.find();

    if ( categories ) {
      return categories;
    }
  }
});

Template.ressources.rendered = function() {
  Categories.distinct("name", function(error, result){
    result.sort();
    var genreList = document.getElementById('categories');
    for(var i in result){
      var option=document.createElement("option");
      option.text=result[i];
      genreList.add(option, null);
    }
  });
}

Template.ressources.events({
  'submit form': function( event, template ) {
    event.preventDefault();

    let ressource = {
      email: template.find( '[name="emailAddress"]' ).value,
      name: template.find( '[name="name"]' ).value,
      address: template.find( '[name="address"]' ).value,
      phone: template.find( '[name="phone"]' ).value,
      category: template.find( '[name="category"]' ).value
    };

    /*Meteor.call( 'acceptInvitation', user, function( error, response ) {
      if ( error ) {
        Bert.alert( error.reason, 'warning' );
      } else {
        Meteor.loginWithPassword( user.email, password );
      }
    });*/
  }
});
