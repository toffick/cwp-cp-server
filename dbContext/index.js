const {users} = require('../models');

module.exports = ({Sequelize}) => {
    const sequelize = new Sequelize(config.db.name, config.db.user, config.db.password, config.db.options);

    const User = user(Sequelize, sequelize);

    return {
        Team,
        User,
        sequelize,
        Sequelize
    };
};
