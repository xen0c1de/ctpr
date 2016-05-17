Accounts.emailTemplates.resetPassword.siteName = () => "CTPR O-LED";
Accounts.emailTemplates.resetPassword.from     = () => "CTPR O-LED <support@o-led.ca>";
Accounts.emailTemplates.resetPassword.subject  = () => "[CTPR O-LED] Réinitialiser votre mot de passe";

Accounts.emailTemplates.resetPassword.text = ( user, url ) => {
  let emailAddress   = user.emails[0].address,
      urlWithoutHash = url.replace( '#/', '' ),
      supportEmail   = "support@o-led.ca",
      emailBody      = `Une demande de réinitialisation de mot de passe a été faite pour le compte associé à l'adresse (${emailAddress}). Pour réinitialiser le mot de passe, visité le lien suivant :\n\n${urlWithoutHash}\n\n Si vous n'avez pas demandé ce changement, s'il vous plaît ignorer ce email. Si vous pensez que cette demande pourrait être malicieuse, n'hésitez pas à communiquer avec l'équipe de support: ${supportEmail}.`;

  return emailBody;
};
