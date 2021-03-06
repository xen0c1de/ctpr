let login = ( options ) => {
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
      },
      password: {
        required: true
      }
    },
    messages: {
      emailAddress: {
        required: 'Adresse courriel requise.',
        email: 'Est-ce que ce courriel est bon?'
      },
      password: {
        required: 'Mot de passe requis.'
      }
    },
    submitHandler() { _handleLogin( template ); }
  };
};

let _handleLogin = ( template ) => {
  let email    = template.find( '[name="emailAddress"]' ).value,
      password = template.find( '[name="password"]' ).value;

  Meteor.loginWithPassword( email, password, ( error ) => {
    if ( error ) {
      Bert.alert({
        message: error.reason,
        type: 'warning',
        style: 'growl-top-right'
      });
    } else {
      Bert.alert({
        message: 'Connexion!',
        type: 'success',
        style: 'growl-top-right'
      });
    }
  });
};

Modules.client.login = login;
