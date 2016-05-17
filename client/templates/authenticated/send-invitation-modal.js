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
          Bert.alert( error.reason, "warning" );
        } else {
          $( "#send-invitation-modal" ).modal( 'hide' );
          $( '.modal-backdrop' ).hide();
          Bert.alert( "Invitation envoyé!", "success" );
        }
      });
    } else {
      Bert.alert( "S'il vous plaît entrer un courriel et choissir un rôle.", "warning" );
    }
  }
});
