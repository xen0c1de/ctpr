var i = 1;

Template.ctprCompleteModal.events({
  'submit form' ( event, template ) {
    event.preventDefault();

    //define email variables
    let email = template.find( "[name='emailAddress']" ).value,
        name  = template.find( "[name='name']" ).value,
        phone = template.find( "[name='phone']" ).value;

    var ctpr = [];
    var qty_len = [];

    //grab each ctpr composite into an array
    $( "#item-list li" ).each( function(){
      var item = $(this).text();
      ctpr.push( item );
    });

    //grab each define qty and length defined by user into array
    for ( let j = 0; j < i; j++ ) {
      qty_len.push( { qty:template.find( "[name='qty"+j+"']" ).value, len:template.find( "[name='long"+j+"']" ).value } );
    }

    //prepare to send email and return errors if any occor to report to user
    if ( email && name && phone !== "" ) {
      Meteor.call( "sendRequest", {
        email: email,
        name: name,
        phone: phone,
        ctpr: ctpr,
        qty_len: qty_len
      }, ( error, response ) => {
        if ( error ) {
          Bert.alert({
            message: error.reason,
            type: 'warning',
            style: 'growl-top-right'
          });
        } else {
          //hide modal
          $( "#send-invitation-modal" ).modal( 'hide' );
          $( '.modal-backdrop' ).hide();
          //empty componants on modal list
          $( "#item-list" ).empty();
          //reset qty len counter
          i=0;
          Bert.alert({
            message: "Demande envoyé!",
            type: 'success',
            style: 'growl-top-right'
          });
        }
      });
    } else {
      Bert.alert({
        hideDelay: 4000,
        message: "S'il vous plaît saisir un courriel, nom et # de téléphone.",
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
