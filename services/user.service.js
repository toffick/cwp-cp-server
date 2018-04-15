const CrudService = require('./crud.service');

class UserService extends CrudService {
  constructor ({context, userSchema, errors}) {
    super(context['Users'], userSchema, errors);
  }
}

module.exports = UserService;
