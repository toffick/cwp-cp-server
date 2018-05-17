const testInstance = require('./../helpers/supertest')();

module.exports = () => {

	return {
		readMovies: (options) => testInstance
			.get(`/api/v1/movies`)
			.expect(200)
			.then((res) => res.body)
		,
		readAllWithMeta: (options) => testInstance
			.get(`/api/v1/movies?limit=10`)
			.expect(200)
			.then((res) => res.body)
		,
		readOnce: (options) => testInstance
			.get(`/api/v1/movies/${options.id}`)
			.expect(200)
			.then((res) => res.body)
	}
};
