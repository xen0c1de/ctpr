var i = 1;

Template.ctprCompleteModal.events({
  'submit form' ( event, template ) {
    event.preventDefault();

    let email = template.find( "[name='emailAddress']" ).value,
        name  = template.find( "[name='name']" ).value,
        phone = template.find( "[name='phone']" ).value;

    if ( email && name && phone !== "" ) {
      Meteor.call( "sendRequest", {
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
          $( "#item-list" ).empty();
          i=0;
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
  },
  'click .plus-sign' (event) {
    let newRowContent = "<tr><td><input type=\"text\" class=\"form-control\" name=\"qty"+i+"\"></td><td><input type=\"text\" class=\"form-control\" name=\"long"+i+"\"></td><td><button type=\"button\" class=\"btn minus-sign\"><span class=\"glyphicon glyphicon-minus-sign logo-small-red\" aria-hidden=\"true\"></span></button></td></tr>";
    $( "#profile-length tbody" ).append( newRowContent );
    i++;
  },
  'click .minus-sign' (event) {
    $(event.currentTarget).closest('tr').remove();
  },
  'click #close' (event) {
    $( "#item-list" ).empty();
    let newRowContent = "<tr><td><input type=\"text\" class=\"form-control\" name=\"qty0\"></td><td><input type=\"text\" class=\"form-control\" name=\"long0\"></td><td><button type=\"button\" class=\"btn minus-sign\"><span class=\"glyphicon glyphicon-minus-sign logo-small-red\" aria-hidden=\"true\"></span></button></td></tr>";
    $( "#profile-length tbody" ).empty();
    $( "#profile-length tbody" ).append( newRowContent );
    i=1;
  }
});
