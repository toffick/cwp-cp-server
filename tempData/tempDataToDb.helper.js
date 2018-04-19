const users = require('./users');
const movies = require('./movies');

module.exports = async (db, logger) => {
    const u1 = await db['Users'].create(users[0]);
    const u2 = await db['Users'].create(users[1]);

    const moviesItem = await db['Movies'].bulkCreate(movies);

    logger.info('tempDataToDb -> the test data was added to db');
};
