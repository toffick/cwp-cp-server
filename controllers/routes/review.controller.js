const CrudController = require('./crud.controller');

class ReviewController extends CrudController {
    constructor({reviewService}) {
        super(reviewService, 'review');

        this.registerRoutes();
    }

    async create(req, res) {
        res.json(await this.service.create(req.body, req.user.id));
    }
}

module.exports = ReviewController;
