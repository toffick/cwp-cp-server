const wrap = require('../helpers/wrap.helper');

module.exports = ({config, userGenreStatisticsService, cacheService}) => wrap(async (req, res, next) => {

	const {user} = req;

	if (user) {
		const cacheString = `recommendations:${user.id}`;

		let recommendationsByGenres = await cacheService.get(cacheString);

		if (!recommendationsByGenres && req.method === 'GET') {
			recommendationsByGenres = await userGenreStatisticsService.generateRecommendations(user.id);
			cacheService.set(cacheString, recommendationsByGenres);
		}

		req.recommendations = recommendationsByGenres;

	}


	return next()
});
