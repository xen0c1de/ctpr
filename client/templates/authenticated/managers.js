Template.managers.events({
  'submit form': function( event, template ) {
    event.preventDefault();

    let ressource = {
      email: template.find( '[name="emailAddress"]' ).value,
      name: template.find( '[name="name"]' ).value,
      address: template.find( '[name="address"]' ).value,
      phone: template.find( '[name="phone"]' ).value,
      category: template.find( '[name="category"]' ).value
    };

    Meteor.call( 'acceptInvitation', user, function( error, response ) {
      if ( error ) {
        Bert.alert( error.reason, 'warning' );
      } else {
        Meteor.loginWithPassword( user.email, password );
      }
    });
  }
});
