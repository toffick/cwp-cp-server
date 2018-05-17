const request = require('./../utils/users');
chai = require('chai');

const expect = chai.expect;

describe('controllers/users', () => {

	beforeEach(() => {});

	it('try to read all users', async () => {
		const res = await request().readUsers();

		expect(res.success).to.be.false;
		expect(res.error.message).to.be.equal('Access denied');
	});

	it('login success', async () => {
		const res = await request().login({email: '1', password: '1'});

		expect(res.success).to.be.true;
		expect(res.payload.role).to.be.equal('ADMIN');
	});

	it('login failure', async () => {
		const res = await request().login({email: '11', password: '1'});

		expect(res.success).to.be.false;
		expect(res.error.message).to.be.equal('Email or password is incorrect');

	});

});
