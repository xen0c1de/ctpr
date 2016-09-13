_ = lodash;

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
total: totals (oled, nrg, lumen, others, client) for this PRFL
date: date of sending
*/
let request = ( options ) => {
  var clientEmail = _prepareClientEmail( options.name, options.ctpr, options.rowArray, options.drivers, options.total, options.code, options.date );
      oledEmail = _prepareOledEmail( options );
  _sendRequest( options.email, clientEmail );
  _sendRequest( Meteor.settings.private.quoteEmail, oledEmail );
};

/*
prepare the email for the user
needing the name, PRFL he selected which each row entered, the actual code and the total price.
*/
let _prepareClientEmail = ( name, ctpr, rowArray, drivers, total, code, date ) => {
  let domain = Meteor.settings.private.domain;

  //find all drivers with qty not 0
  let newDrivers = _.filter(drivers, function(o){ return o.qty != 0 });

  SSR.compileTemplate( 'invitation', Assets.getText( 'email/templates/requestClient.html' ) );
  let html = SSR.render( 'invitation', { name: name, ctpr: ctpr, rowArray: rowArray, drivers: newDrivers, total: total, code: code, date: date } );

  return html;
};

/*
Prepare the email for OLED. we include every piece of info to simplify
the work of the user receiving the request for quote.
*/
let _prepareOledEmail = ( options ) => {
  let domain = Meteor.settings.private.domain,
      userId = options.userId;

  //check if user is nrg so we know to decrypt only oled cost
  if( Roles.userIsInRole( userId, ['nrg'] ) ) {
    let oled_total = options.total.oled_total;
    //decrypt the oled cost
    oled_total = CryptoJS.AES.decrypt(oled_total, Meteor.settings.private.secretPassphrase).toString(CryptoJS.enc.Utf8);
    //set the decrypted price in place
    options.total.oled_total = oled_total;
  //else if it's lumen or others we'll need to decrypt oled and nrg
  } else if ( Roles.userIsInRole( userId, ['lumen'] ) ) {
    let oled_total = options.total.oled_total,
        nrg_total = options.total.nrg_total;
    //decrypt the oled and nrg cost
    oled_total = CryptoJS.AES.decrypt(oled_total, Meteor.settings.private.secretPassphrase).toString(CryptoJS.enc.Utf8);
    nrg_total = CryptoJS.AES.decrypt(nrg_total, Meteor.settings.private.secretPassphrase).toString(CryptoJS.enc.Utf8);
    //set the decrypted price in place
    options.total.oled_total = oled_total;
    options.total.nrg_total = nrg_total;
  }

  let drivers = options.drivers;
  //find all drivers with qty not 0
  options.drivers = _.filter(drivers, function(o){ return o.qty != 0 });

  SSR.compileTemplate( 'invitation', Assets.getText( 'email/templates/requestOLED.html' ) );
  let html = SSR.render( 'invitation', { email: options.email,
                                        name: options.name,
                                        phone: options.phone,
                                        ctpr: options.ctpr,
                                        code: options.code,
                                        total: options.total,
                                        drivers: options.drivers,
                                        groups: options.groups,
                                        individuals: options.individuals,
                                        rowArray: options.rowArray,
                                        date: options.date } );

  return html;
};

/*
send the actual email
*/
let _sendRequest = ( email, content ) => {
  Email.send({
    to: email,
    from: "o-led.ca <support@o-led.ca>",
    subject: "Demande de soumission O-LED",
    html: content
  });
};

Modules.server.sendRequest = request;
