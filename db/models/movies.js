module.exports = (Sequelize, sequelize) => sequelize.define('movies', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: Sequelize.STRING(512),
    year: Sequelize.INTEGER,
    runtime: Sequelize.INTEGER,
    director: Sequelize.STRING(200),
    plot: Sequelize.STRING(2000),
    actors: Sequelize.STRING(200),
    posterUrl: Sequelize.STRING(512)
});

