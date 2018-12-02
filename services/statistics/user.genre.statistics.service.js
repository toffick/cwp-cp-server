const async = require('async');

class UserGenreStatisticsService {
	/**
	 *
	 * @param {StatisticsRepository} statisticsRepository
	 */
	constructor({statisticsRepository}) {
		this.statisticsRepository = statisticsRepository;
	}

	/**
	 *
	 * @param movie
	 * @param user
	 * @returns {void}
	 */
	async updateUserStatistics(movie, user) {
		if (!user || !user.id) {
			return;
		}

		const userId = user.id;
		const genresIds = movie.genres;

		async.eachSeries(
			genresIds, (genreId, next) =>
				this.statisticsRepository.createOrUpdateByGenre(userId, genreId.id)
					.then(() => next())
					.catch((e) => next(e))
		)
	}

}

module.exports = UserGenreStatisticsService;
