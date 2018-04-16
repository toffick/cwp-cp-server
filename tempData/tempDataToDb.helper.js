const users = require('./users');

module.exports = async (db) => {
    await db['Users'].create(users[0]);
    await db['Users'].create(users[1]);
};
