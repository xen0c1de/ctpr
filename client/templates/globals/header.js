Template.header.helpers({
  brandLink() {
    let home = FlowRouter.path( '/' ),
        index = FlowRouter.path( 'list' );
    return !Meteor.loggingIn() && !Meteor.userId() ? home : index;
  }
});

Template.header.events({
  'click .logout' () {
    Meteor.logout( ( error ) => {
      if ( error ) {
        Bert.alert( error.reason, 'warning' );
      } else {
        Bert.alert( 'Déconnexion!', 'success' );
      }
    });
  }
});
