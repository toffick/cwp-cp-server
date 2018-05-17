const {Router} = require('express');
const wrap = require('../../helpers/wrap.helper');
const sender = require('../../helpers/sender.helper');

class CrudController {
    constructor(service, paramName, cacheService) {
        this.service = service;
        this.paramName = `${paramName}Id`;
        this.cacheService = cacheService;

        this.readAll = this.readAll.bind(this);
        this.read = this.read.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);

        this.router = Router({mergeParams: true});
        this.routes = {
            '/': [
                {method: 'get', cb: this.readAll},
                {method: 'post', cb: this.create}
            ],
            [`/:${this.paramName}`]: [
                {method: 'get', cb: this.read},
                {method: 'put', cb: this.update},
                {method: 'delete', cb: this.delete}
            ]
        };
    }
	/**
	 * @api {get} /users/:id/reviews/:reviewId
	 * @apiParam {Number} reviewId
	 * @apiGroup GetReviews
	 */
	/**
	 * @api {get} /users
	 * @apiGroup GetUsers
	 * @apiPermission ADMIN
	 */
	/**
	 * @api {get} /(movies|actors|genres/reviews)
	 * @apiGroup GetItemsArray
	 *
	 * @apiSuccess {Boolean} successful request flag
	 * @apiSuccess {Object} a payload that consist of array of items
	 *
	 * @apiSuccessExample Success-Response:
	 *     HTTP/1.1 200 OK
	 *     {
 *       "success": "true",
 *       "payload": "{...}"
 *     }
	 *
	 */
    async readAll(req, res) {
        const data = await this.service.readChunk(req.query);
        this.cacheService.set(req, {success: true, payload: data});
        sender(res, data);
    }

	/**
	 * @api {get} /users/:id/reviews
	 * @apiGroup GetReviews
	 */
	/**
	 * @api {get} /users/:id
	 * @apiGroup GetUser
	 * @apiPermission ADMIN
	 */
	/**
	 * @api {get} /(movies|actors|genres)/:id
	 * @apiGroup GetItem
	 *
	 * @apiParam {Number} id item unique ID.
	 *
	 * @apiSuccess {Boolean} successful request flag
	 * @apiSuccess {Object} a payload that consist of item object
	 *
	 * @apiSuccessExample Success-Response:
	 *     HTTP/1.1 200 OK
	 *     {
 *       "success": "true",
 *       "payload": "{...}"
 *     }
	 *
	 * @apiError UserNotFound The id of the User was not found.
	 *
	 */
    async read(req, res) {
        const data = await this.service.read(req.params[this.paramName]);
        this.cacheService.set(req, {success: true, payload: data});
        sender(res, data);
    }

	/**
	 * @apiDescription create item
	 * @api {post} /(users|movies|actors|genres)
	 *
	 * @apiGroup CreateItem
	 * @apiParam {Object} creatingObject
	 *
	 * @apiPermission ADMIN
	 */
    async create(req, res) {
        sender(res, await this.service.create(req.body));
    }
	/**
	 * @api {update} /users/:id/reviews/:reviewId
	 * @apiGroup CreateRiview
	 * @apiParam {Number} reviewId
	 * @apiParam {Object} updatingfields
	 * @apiPermission USER
	 */
	/**
	 * @apiDescription update item by id
	 * @api {update} /(users|movies|actors|genres)/:id
	 * @apiGroup UpdateItem
	 * @apiParam {Object} updatingfields
	 * @apiParam {Number} id
	 *
	 * @apiPermission ADMIN
	 */
    async update(req, res) {
        sender(res, await this.service.update(req.params[this.paramName], req.body));
    }

	/**
	 * @api {delete} /users/:id/reviews/:reviewId
	 * @apiGroup DedleteRiview
	 * @apiParam {Number} reviewId
	 * @apiPermission USER
	 */
	/**
	 * @apiDescription delete item by id
	 * @api {delete} /(users|movies|actors|genres)/:id
	 * @apiGroup DeleteItem
	 * @apiParam {Number} id item unique ID.
	 *
	 * @apiPermission ADMIN
	 */
    async delete(req, res) {
        sender(res, await this.service.delete(req.params[this.paramName]));
    }

    registerRoutes() {

        Object.keys(this.routes).forEach(route => {
            let handlers = this.routes[route];

            if (!handlers || !Array.isArray(handlers)) return;

            for (let handler of handlers) {
                this.router[handler.method](route, wrap(handler.cb));
            }
        });
    }
}

module.exports = CrudController;
