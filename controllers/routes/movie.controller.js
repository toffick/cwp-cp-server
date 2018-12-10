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

		this.routes[`/:${this.paramName}`] = [
			{method: 'get', cb: this.read}
		];

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
		// TODO rm fixed userId

		sender(res, data);

		await this.userGenreStatisticsService.updateUserStatistics(data, req.user);
	}


}

module.exports = MovieController;
