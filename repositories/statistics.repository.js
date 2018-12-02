class StatisticsRepository {
	constructor({contextAudit}) {
		this.genreStatisticsModel = contextAudit['GenreStatistics'];
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

}

module.exports = StatisticsRepository;
