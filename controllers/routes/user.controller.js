const CrudController = require('./crud.controller');

 class UserController extends CrudController {
  constructor ({userService}) {
    super(userService);

    this.registerRoutes();
  }
};

 module.exports = UserController;
