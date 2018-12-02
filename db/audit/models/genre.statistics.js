module.exports = (Sequelize, sequelize) => sequelize.define('genre_statistics', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	userId: Sequelize.INTEGER,
	genreId: Sequelize.INTEGER,
	count: {
		type: Sequelize.BIGINT,
		defaultValue: 1
	}
});

