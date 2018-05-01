const {newRating} = require('../../helpers/rating.helper');
const CrudService = require('./crud.service');

class ReviewService extends CrudService {
    constructor({context, reviewSchema, errors}) {
        super(context['Reviews'], reviewSchema, errors);
        this.moviesRepository = context['Movies'];
        this.defaults.allowedFilterProps =  ['datestamp', 'mark'];
    }

    async create(data, userId) {
        this._validateBySchema(data);

        const item = await this.repository.create({...data, userId});

        const {movieId, mark} = data;

        const {rating, ratingCount} = await this.moviesRepository.findById(movieId);
        await this.moviesRepository.update({
            rating: newRating(rating, ratingCount, mark),
            ratingCount: ratingCount + 1
        }, {where: {id: movieId}, limit: 1});

        return item.get({plain: true});
    }


}

module.exports = ReviewService;
