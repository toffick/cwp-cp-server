module.exports = (Sequelize, sequelize) => sequelize.define('movies', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    description: Sequelize.STRING(512),
    title: Sequelize.STRING(512),
    cover_url: Sequelize.STRING(512)
});

