Template.sendInvitationModal.events({
  'submit form' ( event, template ) {
    event.preventDefault();

    let email = template.find( "[name='emailAddress']" ).value,
        role  = template.find( "[name='roles'] option:selected" ).value;

    if ( email && role !== "" ) {
      Meteor.call( "sendInvitation", {
        email: email,
        role: role
      }, ( error, response ) => {
        if ( error ) {
          Bert.alert({
            message: error.reason,
            type: 'warning',
            style: 'growl-top-right'
          });
        } else {
          $( "#send-invitation-modal" ).modal( 'hide' );
          $( '.modal-backdrop' ).hide();
          Bert.alert({
            message: "Invitation envoyé!",
            type: 'success',
            style: 'growl-top-right'
          });
        }
      });
    } else {
      Bert.alert({
        hideDelay: 4000,
        message: "S'il vous plaît entrer un courriel et choissir un rôle.",
        type: 'warning',
        style: 'growl-top-right'
      });
    }
  }
});
