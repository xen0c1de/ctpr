const authenticatedRedirect = () => {
  //if user is not currently logged in or logging in
  if ( !Meteor.loggingIn() && !Meteor.userId() ) {
    //send him to the login page
    FlowRouter.go( 'login' );
  }
};

const blockUnauthorizedAdmin = ( context, redirect ) => {
  //if user is logged in and not an admin
  if ( Meteor.userId() && !Roles.userIsInRole( Meteor.userId(), 'admin' ) ) {
    //send him to his default page
    Modules.both.redirectUser( { redirect: redirect } );
  }
};

const blockUnauthorizedManager = ( context, redirect ) => {
  //if user is logged in and not an admin or a manager
  if ( Meteor.userId() && !Roles.userIsInRole( Meteor.userId(), [ 'admin', 'manager' ] ) ) {
    //send him to his default page
    Modules.both.redirectUser( { redirect: redirect } );
  }
};

const authenticatedRoutes = FlowRouter.group({
  name: 'authenticated',
  triggersEnter: [ authenticatedRedirect ]
});

authenticatedRoutes.route( '/users', {
  name: 'users',
  triggersEnter: [ blockUnauthorizedAdmin ],
  action() {
    BlazeLayout.render( 'default', { yield: 'users' } );
  }
});

authenticatedRoutes.route( '/managers', {
  name: 'managers',
  triggersEnter: [ blockUnauthorizedManager ],
  action() {
    BlazeLayout.render( 'default', { yield: 'managers' } );
  }
});

authenticatedRoutes.route( '/', {
  name: 'home',
  action() {
    BlazeLayout.render( 'default', { yield: 'home' } );
  }
});
