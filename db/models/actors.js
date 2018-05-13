module.exports = (Sequelize, sequelize) => sequelize.define('actors', {
    name: Sequelize.STRING(256),
    photoUrl: Sequelize.STRING(512),
    bday: Sequelize.STRING(11)
});

