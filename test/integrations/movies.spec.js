const request = require('./../utils/movies');
chai = require('chai');

const expect = chai.expect;

describe('controllers/movies', () => {

	beforeEach(() => {});

	it('read movies', async () => {
		const res = await request().readMovies();

		expect(res.success).to.be.true;
		expect(res.payload.movies.length).to.be.equal(5);
		expect(res.payload.movies[0].title).to.be.equal('Beetlejuice');
	});

	it('read movies with limit 10', async () => {
		const res = await request().readAllWithMeta();

		expect(res.success).to.be.true;
		expect(res.payload.movies.length).to.be.equal(10);
		expect(res.payload.movies[9].title).to.be.equal('Stardust');
	});

	it('read movie by id', async () => {
		const res = await request().readOnce({id: 1});

		expect(res.success).to.be.true;
		expect(res.payload.title).to.be.equal('Beetlejuice');
	});
});
