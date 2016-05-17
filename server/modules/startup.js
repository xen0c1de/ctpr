let startup = () => {
  _setEnvironmentVariables();
  _setBrowserPolicies();
  _generateAccounts();
  _setAdmins();
  _generateCategories();
};

let _setEnvironmentVariables = () => {
  let settings = Meteor.settings.private;
  process.env.MAIL_URL = settings.MAIL_URL;
};

let _setBrowserPolicies = () => {};

let _generateAccounts = () => Modules.server.generateAccounts();

let _setAdmins = () => Modules.server.setAdmins();

let _generateCategories = () => Modules.server.generateCategories();

Modules.server.startup = startup;
