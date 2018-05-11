const CrudController = require('./crud.controller');
const sender = require('../../helpers/sender.helper');

class ReviewController extends CrudController {
    constructor({reviewService, cacheService}) {
        super(reviewService, 'review', cacheService);

        this.registerRoutes();
    }

    async create(req, res) {
        sender(res, await this.service.create(req.body, req.user.id))
    }
}

module.exports = ReviewController;
