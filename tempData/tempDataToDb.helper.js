const users = require('./users');

module.exports = async (db) => {
    const u1 = await db['Users'].create(users[0]);
    const u2 = await db['Users'].create(users[1]);
};
