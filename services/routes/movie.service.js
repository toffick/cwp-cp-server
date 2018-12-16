const CrudService = require('./crud.service');
const getPagination = require('../../helpers/pagination.helper');
const {getRandomInRange} = require('../../utils/random.util');

class MovieService extends CrudService {
	constructor({context, movieSchema, errors, Sequelize}) {
		super(context['Movies'], movieSchema, errors);
		this.actorsRepository = context['Actors'];
		this.genresRepository = context['Genres'];
		this.reviewsRepository = context['Reviews'];
		this.usersRepository = context['Users'];

		this.connection = context['sequelize'];
		this.Sequelize = Sequelize;
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

	async getRandomMovieByCountryAndRating(countries, rating) {

		const whereValues = [];

		if (countries && countries.length) {
			const countriesArray = countries.split(',');
			if (countriesArray.length) {
				whereValues.push({operation: 'country in(?)', value: countriesArray});
			}
		}

		if (rating && !isNaN(rating)) {
			whereValues.push({operation: 'rating >= ?', value: rating});
		}

		const query = `SELECT * FROM movies ${whereValues.length ? `where ${whereValues.map(({operation}) => operation).join(' and ')}` : ''} ORDER BY RAND() LIMIT 1`;

		const movie = await this.connection.query(query,
			{replacements: whereValues.map(({value}) => value), type: this.Sequelize.QueryTypes.SELECT}
		);

		if (!movie || !movie[0]) {
			throw this.errors.notFound;
		}

		return {
			movie: movie[0],
		}

	}

	async create(data) {

		this._validateBySchema(data);

		const {actors, genres} = data;

		const actorsArray = actors.split(',').filter((actorId) => !isNaN(actorId)).map((item) => item.trim());
		const genresArray = genres.split(',').filter((actorId) => !isNaN(actorId)).map((item) => item.trim());

		const normalizedActorsArray = [...new Set(actorsArray)];
		const normalizedGenresArray = [...new Set(genresArray)];

		const item = await this.repository.create(data);

		await Promise.all(normalizedActorsArray.map(async (actorId) => {
			const actor = await this.actorsRepository.findOne({where: {id: actorId}});

			if (!actor) {
				return;
			}

			return item.addActor(actorId)
		}));

		await Promise.all(normalizedGenresArray.map(async (genreId) => {
			const genre = await this.actorsRepository.findOne({where: {id: genreId}});

			if (!genre) {
				return;
			}

			return item.addGenre(genreId)
		}));

		return item.get({plain: true});
	}

}

module.exports = MovieService;
