const CrudController = require('./crud.controller');
const sender = require('../../helpers/sender.helper');

class UserController extends CrudController {
    constructor({userService, reviewController, cacheService}) {
        super(userService, 'user', cacheService);

        this.changeRole = this.changeRole.bind(this);
        this.getProfile = this.getProfile.bind(this);

        this.routes['/:userId/role'] = [{method: 'post', cb: this.changeRole}];
        this.routes['/:userId/profile'] = [{method: 'get', cb: this.getProfile}];

        this.registerRoutes();

        this.router.use('/:userId/reviews', reviewController.router);
    }

	/**
	 * @apiDescription Change user role
	 * @api {post} /users/:userId/role
	 *
	 * @apiGroup ChangeRole
	 * @apiParam {Number} userId user id
	 * @apiParam {Object} role object
     * @apiPermission ADMIN
	 */
    async changeRole(req, res) {
        sender(res, await this.service.changeRole(req.params.userId, req.body.role))
    }
	/**
     * @apiDescription Get user profile info
	 * @api {get} /users/:userId/profile
	 * @apiGroup GetUserProfile
     * @apiParam {Number} userId user id
	 */
    async getProfile(req, res) {
        sender(res, await this.service.getProfile(req.params.userId))
    }

}

module.exports = UserController;
