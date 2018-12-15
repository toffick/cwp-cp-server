const users = require('./users');
const movies = require('./newMovies');
const genres = require('./genres');
// const actors = require('./actors');
const actors = require('./newActors');
const reviews = require('./reviews_new');

const {newRating} = require('../helpers/rating.helper');

module.exports = async (db) => {
	const usersItems = await db['Users'].bulkCreate(users, {individualHooks: true});
	const moviesItems = await db['Movies'].bulkCreate(movies, {individualHooks: true});
	const genresItems = await db['Genres'].bulkCreate(genres, {individualHooks: true});
	const actorsItem = await db['Actors'].bulkCreate(actors, {individualHooks: true});
	const reviewsItem = await db['Reviews'].bulkCreate(reviews, {individualHooks: true});

	await  associateItemsMM(moviesItems, genresItems, 5, 'Genre');
	await  associateItemsMM(moviesItems, actorsItem, 10, 'Actor');

	await setRating(reviews, db);
};

const associateItemsMM = async (sourceItems, targetItems, associateCount, modelType) => {
	for (let i = 0; i < sourceItems.length; i++) {
		const del = (i + 1);
		for (let y = 0; y <= del % associateCount; y++) {
			const newID = ((del * y) + i) % targetItems.length;
			await sourceItems[i][`add${modelType}`](targetItems[newID]);
		}
	}
};

const setRating = async (reviews, db) => {
	for (let i = 0; i < reviews.length; i++) {
		const {movieId, mark} = reviews[i];

		const {rating, ratingCount} = await db['Movies'].findById(movieId);
		await db['Movies'].update({
			rating: newRating(rating, ratingCount, mark),
			ratingCount: ratingCount + 1
		}, {where: {id: movieId}, limit: 1});
	}
}
