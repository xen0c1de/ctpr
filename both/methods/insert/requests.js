Meteor.methods({
  sendRequest( request ) {
    check( request, {
      email: String,
      name: String,
      phone: String,
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
        ctpr: request.ctpr,
        code: request.code,
        drivers: request.drivers,
        groups: request.groups,
        individuals: request.individuals,
        rowArray: request.rowArray,
        total: request.total,
        userId: request.userId,
        date: ( new Date() ).toISOString()
      });
    } catch( exception ) {
      return exception;
    }
  }
});
