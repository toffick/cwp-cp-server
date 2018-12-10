const async = require('async');
const Queue = require('better-queue');
const {getRandomInRange} = require('../../utils/random.util');
const shuffleArray = require('shuffle-array');

class UserGenreStatisticsService {
	/**
	 *
	 * @param {StatisticsRepository} statisticsRepository
	 */
	constructor({statisticsRepository, logger}) {
		this.statisticsRepository = statisticsRepository;
		this.logger = logger;

		this.queueTaskHandler = this.taskHandler.bind(this);
		this.queue = new Queue(this.queueTaskHandler);

		this.recomendationCount = 3;
	}

	taskHandler(task, cb) {
		const {taskType} = task;
		switch (taskType) {
			case UserGenreStatisticsService._taskTypes.UPDATE_GENRE_STATS:
				const {movie, userId} = task;
				this._handleUpdateUserStatistics(movie, userId, cb);
				break;
			default:
				break;
		}
	}


	_handleUpdateUserStatistics(movie, userId, finishedHandlingCb) {

		const genresIds = movie.genres;

		return async.each(
			genresIds,
			(genreId, next) =>
				this.statisticsRepository.createOrUpdateByGenre(userId, genreId.id)
					.then(() => next())
					.catch((e) => next(e)),
			finishedHandlingCb
		)
	}

	/**
	 *
	 * @param movie
	 * @param user
	 * @returns {void}
	 */
	async updateUserStatistics(movie, user) {
		if (!user || !user.id) {
			return false;
		} else {
			const task = {
				movie,
				userId: user.id,
				id: `${user.id}-${movie.id}`,
				taskType: UserGenreStatisticsService._taskTypes.UPDATE_GENRE_STATS
			};

			this.taskHandler(task);
			return true;
		}

	}

	/**
	 *
	 * @param userId
	 * @returns {Promise<{}>}
	 */
	async generateRecommendations(userId) {

		const recommendations = [];

		const userMostVisitedGenres = await this.statisticsRepository.getUserGenres(userId);
		if (!userMostVisitedGenres.length) {
			return recommendations;
		}

		let genresIds = userMostVisitedGenres.map(({genreId}) => genreId);

		genresIds = shuffleArray(genresIds)
			.slice(0, genresIds.length >= this.recomendationCount ? this.recomendationCount : genresIds.length);

		const requestPromises = genresIds
			.map((genreId) => this.statisticsRepository.getMoviesByGenre(genreId));

		const result = await Promise.all(requestPromises)
			.catch((err) => {
				this.logger.warn(err);
			});


		if (!result) {
			return recommendations;
		}

		result.forEach((resultMovies) => recommendations.push(resultMovies[getRandomInRange(0, resultMovies.length - 1)]));

		return recommendations;
	}

}

UserGenreStatisticsService._taskTypes = {
	UPDATE_GENRE_STATS: 'UPDATE_GENRE_STATS'
};

module.exports = UserGenreStatisticsService;
