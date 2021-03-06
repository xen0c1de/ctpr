Template.invite.onCreated( () => {
  Template.instance().subscribe( 'invite', FlowRouter.current().params.token );
});

Template.invite.helpers({
  invitation: function() {
    var invite = Invitations.findOne();

    if ( invite ) {
      return invite;
    }
  }
});

Template.invite.events({
  'submit form': function( event, template ) {
    event.preventDefault();

    let password = template.find( '[name="password"]' ).value;

    let user = {
      email: template.find( '[name="emailAddress"]' ).value,
      firstName: template.find( '[name="firstName"]' ).value,
      lastName: template.find( '[name="lastName"]' ).value,
      password: Accounts._hashPassword( password ),
      token: FlowRouter.current().params.token
    };

    Meteor.call( 'acceptInvitation', user, function( error, response ) {
      if ( error ) {
        Bert.alert({
          message: error.reason,
          type: 'warning',
          style: 'growl-top-right'
        });
      } else {
        Meteor.loginWithPassword( user.email, password );
      }
    });
  }
});
