let recoverPassword = ( options ) => {
  _validate( options.form, options.template );
};

let _validate = ( form, template ) => {
  $( form ).validate( validation( template ) );
};

let validation = ( template ) => {
  return {
    rules: {
      emailAddress: {
        required: true,
        email: true
      }
    },
    messages: {
      emailAddress: {
        required: 'Adresse courriel requise.',
        email: 'Est-ce que ce courriel est bon?'
      }
    },
    submitHandler() { _handleRecovery( template ); }
  };
};

let _handleRecovery = ( template ) => {
  let email = template.find( '[name="emailAddress"]' ).value;

  Accounts.forgotPassword( { email: email }, ( error ) => {
    if ( error ) {
      Bert.alert( error.reason, 'warning' );
    } else {
      Bert.alert( 'Vérifier votre boîte de courriel pour le lien!', 'success' );
    }
  });
};

Modules.client.recoverPassword = recoverPassword;
