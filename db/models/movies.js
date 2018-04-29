module.exports = (Sequelize, sequelize) => sequelize.define('movies', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: Sequelize.STRING(256),
    year: Sequelize.INTEGER,
    runtime: Sequelize.INTEGER,
    director: Sequelize.STRING(256),
    plot: Sequelize.STRING(2048),
    posterUrl: Sequelize.STRING(512)
});

