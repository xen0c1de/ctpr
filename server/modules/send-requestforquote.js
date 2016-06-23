let request = ( options ) => {
  var email = _prepareEmail( options.token );
  _sendRequest( options.email, email );
};

let _prepareEmail = ( token ) => {
  let domain = Meteor.settings.private.domain;
  let url    = `http://${ domain }/invite/${ token }`;

  SSR.compileTemplate( 'invitation', Assets.getText( 'email/templates/request.html' ) );
  let html = SSR.render( 'invitation', { url: url } );

  return html;
};

let _sendRequest = ( email, content ) => {
  Email.send({
    to: email,
    from: "o-led.ca <support@o-led.ca>",
    subject: "Invitation au CTPR Interactif O-LED",
    html: content
  });
};

Modules.server.sendRequest = request;
