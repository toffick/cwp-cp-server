module.exports = (Sequelize, sequelize) => sequelize.define('actors', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: Sequelize.STRING(100),
    photoUrl: Sequelize.STRING(512),
    bday: Sequelize.STRING(100)
});

