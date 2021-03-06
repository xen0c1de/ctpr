let resetPassword = ( options ) => {
  _validate( options.form, options.template );
};

let _validate = ( form, template ) => {
  $( form ).validate( validation( template ) );
};

let validation = ( template ) => {
  return {
    rules: {
      newPassword: {
        required: true,
        minlength: 8
      },
      repeatNewPassword: {
        required: true,
        minlength: 8,
        equalTo: '[name="newPassword"]'
      }
    },
    messages: {
      newPassword: {
        required: "Entrer un nouveau mot de passe.",
        minlength: "Minimum de 8 caractères."
      },
      repeatNewPassword: {
        required: "Répéter le mot de passe.",
        equalTo: "Les mots de passe ne sont pas identiques."
      }
    },
    submitHandler() { _handleReset( template ); }
  };
};

let _handleReset = ( template ) => {
  var token    = FlowRouter.current().params.token,
      password = template.find( '[name="newPassword"]' ).value;

  Accounts.resetPassword( token, password, ( error ) => {
    if ( error ) {
      Bert.alert({
        message: error.reason,
        type: 'danger',
        style: 'growl-top-right'
      });
    } else {
      Bert.alert({
        message: 'Mot de passe réinitialisé!',
        type: 'success',
        style: 'growl-top-right'
      });
    }
  });
};

Modules.client.resetPassword = resetPassword;
