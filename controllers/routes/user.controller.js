const CrudController = require('./crud.controller');

class UserController extends CrudController {
    constructor({userService}) {
        super(userService);

        this.changeRole = this.changeRole.bind(this);

        this.routes['/:id/role'] = [{method: 'post', cb: this.changeRole}];

        this.registerRoutes();
    }

    async changeRole(req, res) {
        res.json(await this.service.changeRole(req.params.id, req.body.role));
    }

}

module.exports = UserController;
