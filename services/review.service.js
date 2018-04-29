const CrudService = require('./crud.service');

class ReviewService extends CrudService {
    constructor({context, reviewSchema, errors}) {
        super(context['Reviews'], reviewSchema, errors);
    }
}

module.exports = ReviewService;
