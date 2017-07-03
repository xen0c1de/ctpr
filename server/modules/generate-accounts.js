let administrators = [
  {
    name: { first: 'Francois', last: 'Lizotte' },
    email: 'support@o-led.ca',
    password: 'q1"We3$R'
  },
];

let generateAccounts = () => {
  let usersExist = _checkIfAccountsExist( administrators.length );

  if ( !usersExist ) {
    _createUsers( administrators );
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
          isAdmin = _checkIfAdmin( user.email );

      if ( isAdmin ) {
        Roles.setUserRoles( userId, 'admin' );
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

Modules.server.generateAccounts = generateAccounts;
