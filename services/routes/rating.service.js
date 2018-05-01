const {newRating} = require('../../helpers/rating.helper');

class RatingService {
    constructor({context, errors}) {
        this.moviesRepository = context['Movies'];
        this.errors = errors;
    }

    async evaluate(movieId, mark) {

        const {rating, ratingCount} = await this.moviesRepository.findById(movieId);
        await this.moviesRepository.update({
            rating: newRating(rating, ratingCount, mark),
            ratingCount: ratingCount + 1
        }, {where: {id: movieId}, limit: 1});

        return {success: true};
    }

}

module.exports = RatingService;
