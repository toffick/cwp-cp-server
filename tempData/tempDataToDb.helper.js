const users = require('./users');
const movies = require('./movies');
const genres = require('./genres');

module.exports = async (db, logger) => {
    const u1 = await db['Users'].create(users[0]);
    const u2 = await db['Users'].create(users[1]);

    const moviesItems = await db['Movies'].bulkCreate(movies);
    const genresItems = await db['Genres'].bulkCreate(genres);
    await  bindGenresToMovies(moviesItems, genresItems);

    logger.info('tempDataToDb -> the test data was added to db');
};

const bindGenresToMovies = async (moviesItems, genresItems) => {
    for (let i = 0; i < moviesItems.length; i++) {
        const del = (i + 1);
        for (let y = 0; y <= del % 5; y++) {
            const newID = ((del * y) + i) % genresItems.length;
            await moviesItems[i].addGenre(genresItems[newID]);
        }
    }
}
