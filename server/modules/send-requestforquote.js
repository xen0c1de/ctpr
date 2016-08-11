/*
email: email,
name: name,
phone: phone,
ctpr: string array of ctpr components,
code: ctpr full product code,
drivers: list of drivers needed,
groups: list of groups with their fixtures (broken down into manufacturering standards),
individuals: list of individuals fixtures (broken down into manufacturering standards),
rowArray: array of rows as entered by user
total: total $ for this PRFL
*/
let request = ( options ) => {
  var clientEmail = _prepareClientEmail( options.name, options.ctpr, options.rowArray, options.total, options.code );
      oledEmail = _prepareOledEmail( options );
  _sendRequest( options.email, clientEmail );
  _sendRequest( Meteor.settings.private.quoteEmail, oledEmail );
};

let _prepareClientEmail = ( name, ctpr, rowArray, total, code ) => {
  let domain = Meteor.settings.private.domain;

  SSR.compileTemplate( 'invitation', Assets.getText( 'email/templates/requestClient.html' ) );
  let html = SSR.render( 'invitation', { name: name, ctpr: ctpr, rowArray: rowArray, total: total, code: code } );

  return html;
};

let _prepareOledEmail = ( options ) => {
  let domain = Meteor.settings.private.domain;

  SSR.compileTemplate( 'invitation', Assets.getText( 'email/templates/requestOLED.html' ) );
  let html = SSR.render( 'invitation', { email: options.email,
                                        name: options.name,
                                        phone: options.phone,
                                        ctpr: options.ctpr,
                                        code: options.code,
                                        drivers: options.drivers,
                                        groups: options.groups,
                                        individuals: options.individuals,
                                        rowArray: options.rowArray } );

  return html;
};

let _sendRequest = ( email, content ) => {
  Email.send({
    to: email,
    from: "o-led.ca <support@o-led.ca>",
    subject: "Demande de soumission O-LED",
    html: content
  });
};

Modules.server.sendRequest = request;
