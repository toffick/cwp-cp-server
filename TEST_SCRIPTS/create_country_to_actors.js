const fs = require('fs');
const random = require('../utils/random.util');

const actors = require('../tempData/actors');

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


const koko = actors.map(actor => {
	const r = random.getRandomInRange(0, countries.length - 1);
	actor.country = countries[r];
	return actor
})

fs.writeFileSync('./newActors.json', JSON.stringify(koko, null, '\t'))
