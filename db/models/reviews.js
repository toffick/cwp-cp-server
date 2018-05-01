module.exports = (Sequelize, sequelize) => sequelize.define('reviews', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    text: Sequelize.STRING(2000),
    datestamp: {type: Sequelize.BIGINT, defaultValue: Date.now()},
    mark: Sequelize.INTEGER,
    userId: Sequelize.INTEGER,
    movieId: Sequelize.INTEGER
});

