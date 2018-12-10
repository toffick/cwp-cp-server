const wrap = require('../helpers/wrap.helper');

module.exports = ({config, userGenreStatisticsService}) => wrap(async (req, res, next) => {

	const {user} = req;
	if (user && req.method === 'GET') {
		const recommendationsUpdateTimeout = config.recommendationsUpdateTimeout;

		const {lru} = req.cookies;

		if (!lru) {

			// const recommendationsByGenres = await userGenreStatisticsService.generateRecommendations(20);
			const recommendationsByGenres = await userGenreStatisticsService.generateRecommendations(user.id);

			req.recommendations = recommendationsByGenres;

			res.cookie('lru', Date.now(), {
				maxAge: recommendationsUpdateTimeout * 1000,
				httpOnly: true
			});
		}
	}

	return next()
});
