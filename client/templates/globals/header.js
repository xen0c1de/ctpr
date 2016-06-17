Template.header.helpers({
  brandLink() {
    let home = FlowRouter.path( '/' ),
        index = FlowRouter.path( 'users' );
    return !Meteor.loggingIn() && !Meteor.userId() ? home : index;
  }
});

Template.header.events({
  'click .logout' () {
    Meteor.logout( ( error ) => {
      if ( error ) {
        Bert.alert({
          message: error.reason,
          type: 'warning',
          style: 'growl-top-right'
        });
        Bert.alert( error.reason, 'warning' );
      } else {
        Bert.alert({
          message: 'Déconnexion!',
          type: 'success',
          style: 'growl-top-right'
        });
      }
    });
  }
});
