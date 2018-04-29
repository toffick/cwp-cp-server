const CrudController = require('./crud.controller');

class ReviewController extends CrudController {
    constructor({reviewService, cacheService}) {
        super(reviewService, 'review', cacheService);

        this.registerRoutes();
    }

    async create(req, res) {
        res.json(await this.service.create(req.body, req.user.id));
    }
}

module.exports = ReviewController;
