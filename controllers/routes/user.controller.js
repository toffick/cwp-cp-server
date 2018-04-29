const CrudController = require('./crud.controller');

class UserController extends CrudController {
    constructor({userService,reviewController}) {
        super(userService, 'user');

        this.changeRole = this.changeRole.bind(this);

        this.routes['/:userId/role'] = [{method: 'post', cb: this.changeRole}];

        this.registerRoutes();

        this.router.use('/:userId/reviews', reviewController.router);
    }

    async changeRole(req, res) {
        res.json(await this.service.changeRole(req.params.userId, req.body.role));
    }

}

module.exports = UserController;
