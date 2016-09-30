Template.login.onRendered( () => {
  Modules.client.login( { form: "#login", template: Template.instance() } );
});

Template.login.events({
  'submit form': ( event ) => {
    event.preventDefault();
    Meteor.logoutOtherClients( ( error ) => {
      if ( error ) {
        Bert.alert({
          message: error.reason,
          type: 'warning',
          style: 'growl-top-right'
        });
      }
    });
  }
});
