Meteor.methods({
  sendRequest( request ) {
    check( request, {
      email: String,
      name: String,
      phone: String,
      company: String,
      project: String,
      emailDist: String,
      phoneDist: String,
      nameDist: String,
      ctpr: Array,
      code: String,
      drivers: Array,
      groups: Array,
      individuals: Array,
      rowArray: Array,
      total: Object,
      userId: String
    });

    try {
      Modules.server.sendRequest({
        email: request.email,
        name: request.name,
        phone: request.phone,
        company: request.company,
        project: request.project,
        emailDist: request.emailDist,
        phoneDist: request.phoneDist,
        nameDist: request.nameDist,
        ctpr: request.ctpr,
        code: request.code,
        drivers: request.drivers,
        groups: request.groups,
        individuals: request.individuals,
        rowArray: request.rowArray,
        total: request.total,
        userId: request.userId,
        date: ( new Date() ).toDateString()
      });
    } catch( exception ) {
      return exception;
    }
  }
});
