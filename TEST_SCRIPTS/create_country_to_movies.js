const fs = require('fs');
const random = require('../utils/random.util');

const movies = require('../tempData/movies');

const countries = ['United States',
	'China',
	'United Kingdom',
	'India',
	'Nigeria',
	'Egypt',
	'Iran',
	'Japan',
	'Korea',
	'Hong Kong',
	'Turkey',
	'Pakistan',
	'Bangladesh',
	'Indonesia',
	'Trinidad and Tobago',
	'Nepal'];


const koko = movies.map(actor => {
	const r = random.getRandomInRange(0, countries.length - 1);
	actor.country = countries[r];
	return actor
});

fs.writeFileSync('./newMovies.json', JSON.stringify(koko, null, '\t'))
