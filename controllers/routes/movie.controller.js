const CrudController = require('./crud.controller');
const sender = require('../../helpers/sender.helper');

class MovieController extends CrudController {
	/**
	 *
	 * @param {MovieService} movieService
	 * @param {CacheService} cacheService
	 * @param {UserGenreStatisticsService} userGenreStatisticsService
	 */
	constructor({movieService, cacheService, userGenreStatisticsService, statisticsGlobal}) {
		super(movieService, 'movie', cacheService);

		this.userGenreStatisticsService = userGenreStatisticsService;

		this.gerRandomMovie = this.gerRandomMovie.bind(this);

		this.routes = {
			'/random': [
				{method: 'get', cb: this.gerRandomMovie}
			],
			'/': [
				{method: 'get', cb: this.readAll},
				{method: 'post', cb: this.create}
			],
			[`/:${this.paramName}`]: [
				{method: 'get', cb: this.read},
				{method: 'put', cb: this.update},
				{method: 'delete', cb: this.delete}
			]
		};

		this.router.use(statisticsGlobal);

		this.registerRoutes();
	}


	async readAll(req, res) {
		const data = await this.service.readChunk(req.query);

		if(req.recommendations){
			data.recommendations = req.recommendations
		}

		this.cacheService.set(req, {success: true, payload: data});
		sender(res, data);
	}

	async read(req, res) {
		const data = await this.service.read(req.params[this.paramName]);

		this.cacheService.set(req, {success: true, payload: data});

		sender(res, data);

		await this.userGenreStatisticsService.updateUserStatistics(data, req.user);
	}

	async gerRandomMovie(req, res) {
		const {countries, rating} = req.query;

		const data = await this.service.getRandomMovieByCountryAndRating(countries, rating);

		sender(res, data);
	}
	async create(req, res) {
		sender(res, await this.service.create(req.body));
		const key = `GET/api/v1/movies/`;
		await this.cacheService.del(key);
	}
}

module.exports = MovieController;
