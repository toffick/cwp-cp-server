const testInstance = require('./../helpers/supertest')();

module.exports = () => {

	return {
		readActors: (options) => testInstance
			.get(`/api/v1/actors`)
			.expect(200)
			.then((res) => res.body)
		,
		readAllWithMeta: (options) => testInstance
			.get(`/api/v1/actors?limit=10`)
			.expect(200)
			.then((res) => res.body)
		,
		readOnce: (options) => testInstance
			.get(`/api/v1/actors/${options.id}`)
			.expect(200)
			.then((res) => res.body)
	}
};
