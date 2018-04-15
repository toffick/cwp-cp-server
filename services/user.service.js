const CrudService = require('./crud.service');

class UserService extends CrudService {
  constructor ({context, schemas, errors}) {
    super(context['users'], schemas['user'], errors);
  }
}

module.exports = UserService;
