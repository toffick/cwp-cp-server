const users = require('./users');
const movies = require('./movies');
const genres = require('./genres');
const actors = require('./actors');

module.exports = async (db, logger) => {
    const u1 = await db['Users'].create(users[0]);
    const u2 = await db['Users'].create(users[1]);

    const moviesItems = await db['Movies'].bulkCreate(movies);
    const genresItems = await db['Genres'].bulkCreate(genres);
    const actorsItem = await db['Actors'].bulkCreate(actors);

    await  associator(moviesItems, genresItems, 5, 'Genre');
    await  associator(moviesItems, actorsItem, 10, 'Actor');

    logger.info('tempDataToDb -> the test data was added to db');
};

const associator = async (sourceItems, targetItems, associateCount, modelType) => {
    for (let i = 0; i < sourceItems.length; i++) {
        const del = (i + 1);
        for (let y = 0; y <= del % associateCount; y++) {
            const newID = ((del * y) + i) % targetItems.length;
            await sourceItems[i][`add${modelType}`](targetItems[newID]);
        }
    }
};

