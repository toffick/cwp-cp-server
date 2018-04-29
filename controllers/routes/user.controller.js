const CrudController = require('./crud.controller');

class UserController extends CrudController {
    constructor({userService,reviewController}) {
        super(userService, 'user');

        this.changeRole = this.changeRole.bind(this);
        this.getProfile = this.getProfile.bind(this);

        this.routes['/:userId/role'] = [{method: 'post', cb: this.changeRole}];
        this.routes['/:userId/profile'] = [{method: 'get', cb: this.getProfile}];

        this.registerRoutes();

        this.router.use('/:userId/reviews', reviewController.router);
    }

    async changeRole(req, res) {
        res.json(await this.service.changeRole(req.params.userId, req.body.role));
    }

    async getProfile(req, res) {
        res.json(await this.service.getProfile(req.params.userId));
    }

}

module.exports = UserController;
