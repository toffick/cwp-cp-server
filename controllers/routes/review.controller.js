const CrudController = require('./crud.controller');

class ReviewController extends CrudController {
    constructor({reviewService}) {
        super(reviewService, 'review');

        this.registerRoutes();
    }
}

module.exports = ReviewController;
