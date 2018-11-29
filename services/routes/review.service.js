const {newRating} = require('../../helpers/rating.helper');
const CrudService = require('./crud.service');

class ReviewService extends CrudService {
	constructor({context, reviewSchema, errors, ratingService}) {
		super(context['Reviews'], reviewSchema, errors);
		this.moviesRepository = context['Movies'];
		this.ratingService = ratingService;

		this.defaults.readChunk.sortField = 'datestamp';
		this.defaults.allowedFilterProps = ['datestamp', 'mark'];
	}

	async create(data, userId) {
		this._validateBySchema(data);

		if (!data.datestamp)
			data.datestamp = Date.now();

		const item = await this.repository.create({...data, userId});

		const {movieId, mark} = data;
		await this.ratingService.evaluate(movieId, mark);

		return item.get({plain: true});
	}

}

module.exports = ReviewService;
