const {genreStatistics} = require('./models/index');
const config = require('config');

module.exports = ({Sequelize}) => {
    const sequelize = new Sequelize(config.db_audit.name, config.db_audit.user, config.db_audit.password, config.db_audit.options);

    const GenreStatistics = genreStatistics(Sequelize, sequelize);

	return {
		GenreStatistics,

        sequelize,
        Sequelize
    };
};
