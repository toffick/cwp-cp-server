const {users} = require('./models');
const config = require('config');

module.exports = ({Sequelize}) => {
    const sequelize = new Sequelize(config.db.name, config.db.user, config.db.password, config.db.options);

    const Users = users(Sequelize, sequelize);

    return {
        Users,
        sequelize,
        Sequelize
    };
};
