module.exports = (Sequelize, sequelize) => sequelize.define('movies', {
    title: Sequelize.STRING(256),
    year: Sequelize.INTEGER,
    runtime: Sequelize.INTEGER,
    director: Sequelize.STRING(256),
    plot: Sequelize.STRING(2048),
    posterUrl: Sequelize.STRING(512),
    rating: {type: Sequelize.FLOAT, defaultValue: 0},
    ratingCount: {type: Sequelize.INTEGER, defaultValue: 0}
});

