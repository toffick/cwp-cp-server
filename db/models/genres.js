module.exports = (Sequelize, sequelize) => sequelize.define('genres', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: Sequelize.STRING(100)
});

