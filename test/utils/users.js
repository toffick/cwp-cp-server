const testInstance = require('./../helpers/supertest')();

module.exports = () => {

	return {
		readUsers: (options) => testInstance
			.get(`/api/v1/users`)
			.expect(403)
			.then((res) => res.body)
		,
		login: (options) => testInstance
			.post(`/auth/login`)
			.send({...options})
			.then((res) => res.body)
	}
};
