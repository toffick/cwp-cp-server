const request = require('./../utils/actors');
chai = require('chai');

const expect = chai.expect;

describe('controllers/actors', () => {

	beforeEach(() => {});

	it('read actors', async () => {
		const res = await request().readActors();

		expect(res.success).to.be.true;
		expect(res.payload.length).to.be.equal(5);
		expect(res.payload[0].name).to.be.equal('Quinton Aaron');
	});

	it('read actor with limit 10', async () => {
		const res = await request().readAllWithMeta();

		expect(res.success).to.be.true;
		expect(res.payload.length).to.be.equal(10);
		expect(res.payload[9].name).to.be.equal('J. B. Adams');
	});

	it('read actor by id', async () => {
		const res = await request().readOnce({id: 1});

		expect(res.success).to.be.true;
		expect(res.payload.name).to.be.equal('Quinton Aaron');
	});
});
