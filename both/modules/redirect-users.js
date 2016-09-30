let route = ( options ) => {
  return options && options.redirect ? _sendUserToDefault( options.redirect ) : _sendUserToDefault();
};

let _sendUserToDefault = ( redirect ) => {
  let userId = Meteor.userId();

  if ( Roles.userIsInRole( userId, 'admin' ) )    {
    _redirectUser( 'users', redirect );
  }

  if ( Roles.userIsInRole( userId, 'manager' ) )  {
    _redirectUser( 'managers', redirect );
  }

  _redirectUser( 'home', redirect );
};

let _redirectUser = ( path, redirect ) => {
  if ( redirect ) {
    redirect( path );
  } else {
    FlowRouter.go( FlowRouter.path( path ) );
  }
};

Modules.both.redirectUser = route;
