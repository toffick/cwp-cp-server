module.exports = (Sequelize, sequelize) => sequelize.define('genre_statistics', {
	userId: Sequelize.INTEGER,
	genreId: Sequelize.INTEGER,
	count: {
		type: Sequelize.BIGINT,
		defaultValue: 1
	}
});

