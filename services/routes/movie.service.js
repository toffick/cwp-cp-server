const CrudService = require('./crud.service');
const getPagination = require('../../helpers/pagination.helper');

class MovieService extends CrudService {
	constructor({context, movieSchema, errors}) {
		super(context['Movies'], movieSchema, errors);
		this.actorsRepository = context['Actors'];
		this.genresRepository = context['Genres'];
		this.reviewsRepository = context['Reviews'];
		this.usersRepository = context['Users'];

		this.defaults.allowedFilterProps = ['title', 'year', 'runtime', 'director', 'ratingCount', 'rating', 'genres.name'];
	}

	async read(movieId) {
		movieId = parseInt(movieId);

		if (isNaN(movieId)) {
			throw this.errors.invalidId;
		}

		const item = await this.repository.find({
			where: {id: movieId},
			include: [{
				model: this.genresRepository,
				as: 'genres',
			}, {
				model: this.actorsRepository,
				as: 'actors'
			}, {
				model: this.reviewsRepository,
				as: 'reviews',
				order: [['datestamp', 'DESC']],
				attributes: ['text', 'datestamp', 'mark'],
				include: [{
					model: this.usersRepository,
					attributes: ['id', 'name']
				}]
			}],
			order: [[this.reviewsRepository, 'datestamp', 'desc']]
		});

		if (!item) {
			throw this.errors.notFound;
		}

		return item;
	}

	async readChunk(query) {
		const findOptions = this._normalizeOptions(query);
		const {rows: movies, count} = await this.repository.findAndCountAll({
				...findOptions,
				include: [{model: this.genresRepository, as: 'genres', attributes: ['name']}]
			}
		);
		const pagination = getPagination(count, Number(query.page) || this.defaults.readChunk.page, findOptions.limit);

		return {
			movies,
			meta: {pagination}
		}
	}
}

module.exports = MovieService;
