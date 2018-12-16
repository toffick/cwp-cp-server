const CrudController = require('./crud.controller');
const sender = require('../../helpers/sender.helper');


class ReviewController extends CrudController {


	/**
	 *
 	 * @param {ReviewService} reviewService
	 * @param {CacheService} cacheService
	 */
	constructor({reviewService, cacheService}) {
        super(reviewService, 'review', cacheService);

        this.registerRoutes();
    }

	/**
	 * @apiDescription Create review
	 * @api {post} /users/:userId/reviews
	 *
	 * @apiGroup CreateReview
	 * @apiParam {Number} userId id
	 * @apiParam {Object} review object
	 */
    async create(req, res) {
        sender(res, await this.service.create(req.body, req.user.id));
		const reviewKey = `GET/api/v1/movies/${req.body.movieId}`;
		await this.cacheService.del(reviewKey);
    }
}

module.exports = ReviewController;
