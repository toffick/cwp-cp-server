const users = require('./users');
const movies = require('./movies');
const genres = require('./genres');
const actors = require('./actors');
const reviews = require('./reviews');

module.exports = async (db) => {
    const usersItems = [];

    for(let user of users){
        usersItems.push(await db['Users'].create(user))
    }

    const moviesItems = await db['Movies'].bulkCreate(movies);
    const genresItems = await db['Genres'].bulkCreate(genres);
    const actorsItem = await db['Actors'].bulkCreate(actors);
    const reviewsItem = await db['Reviews'].bulkCreate(reviews);

    await  associateItemsMM(moviesItems, genresItems, 5, 'Genre');
    await  associateItemsMM(moviesItems, actorsItem, 10, 'Actor');
    await  associateItemsNM(moviesItems.slice(0,15), reviewsItem, 'Review');
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

const associateItemsNM = async (sourceItems, targetItems, modelType) => {
    for (let i = 0; i < targetItems.length; i++) {
        for (let y = 0; y <= i; y++) {
            const newID = ((i+2)*11)  % sourceItems.length;
            await sourceItems[newID][`add${modelType}`](targetItems[i]);
        }
    }
};
