const Gen = require('sentence-generator')
const fs = require('fs');

const {getRandomInRange} = require('../utils/random.util');

const gen = Gen('./content.txt');

const MAX_USER_ID = 18,
	MAX_MOVIE_ID = 146;


// {
// 	"text": "Aute eiusmod incididunt amet incididunt id duis Lorem amet consectetur sint fugiat. Excepteur minim ipsum aliquip aliqua minim veniam eiusmod mollit pariatur minim enim cillum cupidatat veniam. Irure nostrud non officia pariatur quis do reprehenderit ullamco. Duis nisi Lorem dolore labore do ullamco ex quis dolor enim ex proident.\r\n",
// 	"datestamp": 1257999092857,
// 	"mark": 8,
// 	"userId": 2,
// 	"movieId": 4
// },

function getRandomLengthSentence() {
	const min = 1;
	const max = 10;
	const randomInt = getRandomInRange(min, max);

	const randomSentence = gen.take(randomInt);

	return randomSentence.replace(/['–]/gi, '').trim();
}

function getRandomDatestamp() {
	return getRandomInRange(1257000000000, Date.now());
}

function getRandomMark() {
	return getRandomInRange(0, 10);
}

function getReviews() {
	const reviews = [];
	for (let i = 1; i < MAX_MOVIE_ID; i++) {
		const reviewCount = getRandomInRange(0,15);
		for (let y = 0; y <= reviewCount; y++) {
			const userId = getRandomInRange(1, MAX_USER_ID);
			reviews.push(JSON.stringify({
				text: getRandomLengthSentence(),
				datestamp: getRandomDatestamp(),
				mark: getRandomMark(),
				userId,
				movieId: i
			}, null, '\t'))
		}
	}

	return reviews;
}

fs.writeFileSync('./reviewss.json', getReviews())
