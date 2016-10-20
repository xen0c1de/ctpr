let administrators = [
  {
    name: { first: 'Francois', last: 'Lizotte' },
    email: 'support@o-led.ca',
    password: 'password'
  }
];

let nrg = [
  {
    name: { first: 'Francois', last: 'Lizotte' },
    email: 'francois@nrgqc.com',
    password: 'password'
  }
];

let master = [
  {
    name: { first: 'Francois', last: 'Lizotte' },
    email: 'info@nrgqc.com',
    password: 'password'
  }
];

let generateAccounts = () => {
  let usersExist = _checkIfAccountsExist( administrators.length + nrg.length + master.length );

  if ( !usersExist ) {
    _createUsers( administrators );
    _createUsers( nrg );
    _createUsers( master );
  }
};

let _checkIfAccountsExist = ( count ) => {
  let userCount = Meteor.users.find().count();
  return userCount < count ? false : true;
};

let _createUsers = ( users ) => {
  for ( let i = 0; i < users.length; i++ ) {
    let user       = users[ i ],
        userExists = _checkIfUserExists( user.email );

    if ( !userExists ) {
      let userId  = _createUser( user ),
          isAdmin = _checkIfAdmin( user.email ),
          isNrg = _checkIfNrg( user.email );

      if ( isAdmin ) {
        Roles.setUserRoles( userId, 'admin' );
      } else if ( isNrg ) {
        Roles.setUserRoles( userId, 'nrg' );
      } else {
        Roles.setUserRoles( userId, 'master' );
      }
    }
  }
};

let _checkIfUserExists = ( email ) => {
  return Meteor.users.findOne( { 'emails.address': email } );
};

let _createUser = ( user ) => {
  let userId = Accounts.createUser({
    email: user.email,
    password: user.password,
    profile: {
      name: user.name
    }
  });

  return userId;
};

let _checkIfAdmin = ( email ) => {
  return _.find( administrators, ( admin ) => {
    return admin.email === email;
  });
};

let _checkIfNrg = ( email ) => {
  return _.find( nrg, ( nrg ) => {
    return nrg.email === email;
  });
};

Modules.server.generateAccounts = generateAccounts;
