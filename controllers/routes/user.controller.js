const CrudController = require('./crud.controller');

 class UserController extends CrudController {
  constructor ({userService, cacheService}) {
    super(userService, cacheService);

    this.registerRoutes();
  }

};

 module.exports = UserController;
