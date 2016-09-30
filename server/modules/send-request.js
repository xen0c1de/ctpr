_ = lodash;

/*
email: email,
name: name,
phone: phone,
company: company,
project: project,
emailDist: Distributor email,
phoneDist: Distributor phone,
nameDist: Distributor name,
ctpr: string array of ctpr components,
code: ctpr full product code,
drivers: list of drivers needed,
groups: list of groups with their fixtures (broken down into manufacturering standards),
individuals: list of individuals fixtures (broken down into manufacturering standards),
rowArray: array of rows as entered by user
total: totals (oled, nrg, lumen, others, client) for this PRFL
userId: id of logged user
date: date of sending
*/
let request = ( options ) => {
  var clientEmail = _prepareClientEmail( options.name, options.project, options.nameDist, options.phoneDist, options.emailDist, options.ctpr, options.rowArray, options.drivers, options.total, options.code, options.date ),
      oledEmail = _prepareOledEmail( options ),
      loggedUserEmail = _prepareLoggedUserEmail( options );
  _sendRequest( options.email, clientEmail );
  _sendRequest( Meteor.users.findOne( options.userId ).emails[0].address, loggedUserEmail );
  _sendRequest( Meteor.settings.private.quoteEmail, oledEmail );
};

/*
prepare the email for the user
needing the name, PRFL he selected which each row entered, the actual code and the total price.
*/
let _prepareClientEmail = ( name, project, nameDist, phoneDist, emailDist, ctpr, rowArray, drivers, total, code, date ) => {
  let domain = Meteor.settings.private.domain;

  //find all drivers with qty not 0
  let newDrivers = _.filter(drivers, function(o){ return o.qty != 0 });

  SSR.compileTemplate( 'request', Assets.getText( 'email/templates/requestClient.html' ) );
  let html = SSR.render( 'request', { name: name,
                                      project: project,
                                      nameDist: nameDist,
                                      phoneDist: phoneDist,
                                      emailDist: emailDist,
                                      ctpr: ctpr,
                                      rowArray: rowArray,
                                      drivers: newDrivers,
                                      total: total,
                                      code: code,
                                      date: date } );

  return html;
};

/*
prepare the email for the logged user
needing the name, PRFL he selected which each row entered, the actual code, created date and the total price.
*/
let _prepareLoggedUserEmail = ( options ) => {
  let domain = Meteor.settings.private.domain,
      userId = options.userId;
  //check the user role so we know which price to send
  if( Roles.userIsInRole( userId, ['nrg'] ) ) {
    //compile email for nrg
    SSR.compileTemplate( 'request', Assets.getText( 'email/templates/requestLoggedUserNrg.html' ) );
  } else if ( Roles.userIsInRole( userId, ['lumen'] ) ) {
    //compile email for lumen
    SSR.compileTemplate( 'request', Assets.getText( 'email/templates/requestLoggedUserLumen.html' ) );
  } else if ( Roles.userIsInRole( userId, ['user'] ) ) {
    //compile email for others
    SSR.compileTemplate( 'request', Assets.getText( 'email/templates/requestLoggedUserOthers.html' ) );
  } else if ( Roles.userIsInRole( userId, ['oled'] ) ) {
    //compile email for others
    SSR.compileTemplate( 'request', Assets.getText( 'email/templates/requestOLED.html' ) );
  }

  //find all drivers with qty not 0
  let newDrivers = _.filter(options.drivers, function(o){ return o.qty != 0 });

  let html = SSR.render( 'request', { email: options.email,
                                        name: options.name,
                                        phone: options.phone,
                                        company: options.company,
                                        project: options.project,
                                        emailDist: options.emailDist,
                                        phoneDist: options.phoneDist,
                                        nameDist: options.nameDist,
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
  } else if ( Roles.userIsInRole( userId, ['lumen', 'user'] ) ) {
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

  SSR.compileTemplate( 'request', Assets.getText( 'email/templates/requestOLED.html' ) );
  let html = SSR.render( 'request', { email: options.email,
                                        name: options.name,
                                        phone: options.phone,
                                        company: options.company,
                                        project: options.project,
                                        emailDist: options.emailDist,
                                        phoneDist: options.phoneDist,
                                        nameDist: options.nameDist,
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
