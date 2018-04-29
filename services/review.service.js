const CrudService = require('./crud.service');

class ReviewService extends CrudService {
    constructor({context, reviewSchema, errors}) {
        super(context['Reviews'], reviewSchema, errors);
    }

   async create(data, userId){
        this._validateBySchema(data);

        const item = await this.repository.create({...data, userId});

        return item.get({plain: true});
    }


}

module.exports = ReviewService;
