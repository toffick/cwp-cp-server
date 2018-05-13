module.exports = (Sequelize, sequelize) => sequelize.define('genres', {
    name: Sequelize.STRING(128)
});

