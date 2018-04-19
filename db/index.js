const {users, movies} = require('./models');
const config = require('config');

module.exports = ({Sequelize}) => {
    const sequelize = new Sequelize(config.db.name, config.db.user, config.db.password, config.db.options);

    const Users = users(Sequelize, sequelize);
    const Movies = movies(Sequelize, sequelize);

    return {
        Users,
        Movies,
        sequelize,
        Sequelize
    };
};
