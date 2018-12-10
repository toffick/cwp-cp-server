class StatisticsRepository {
	constructor({contextAudit, context}) {
		this.genreStatisticsModel = contextAudit['GenreStatistics'];
		this.moviesModel = context['Movies'];
		this.genresRepository = context['Genres'];
	}

	/**
	 *
	 * @param userId
	 * @param genreId
	 */
	createOrUpdateByGenre(userId, genreId) {
		return this.genreStatisticsModel
			.findOne({where: {userId, genreId}})
			.then((obj) => {
				if (obj) {
					return obj.update({count: obj.count + 1});
				} else {
					return this.genreStatisticsModel.create({userId, genreId});
				}
			});
	}

	getUserGenres(userId) {
		return this.genreStatisticsModel
			.findAll({
				where: {userId},
				order: [['count', 'DESC']],
				limit: 5,
				raw: true,
				attributes: ['genreId', 'count']
			})
	}

	async getMoviesByGenre(genreId) {
		const genreItem = await this.genresRepository.findOne({where: {id: genreId}});

		if(!genreItem){
			return null;
		}

		return genreItem.getMovies({raw: true});
	}

}

module.exports = StatisticsRepository;
