const {users, movies, genres, actors, reviews} = require('./models/index');
const config = require('config');

module.exports = ({Sequelize}) => {
    const sequelize = new Sequelize(config.db.name, config.db.user, config.db.password, config.db.options);

    const Users = users(Sequelize, sequelize);
    const Movies = movies(Sequelize, sequelize);
    const Genres = genres(Sequelize, sequelize);
    const Actors = actors(Sequelize, sequelize);
    const Reviews = reviews(Sequelize, sequelize);

    Movies.belongsToMany(Genres, {through: 'genres_movies', as: 'genres'});
    Genres.belongsToMany(Movies, {through: 'genres_movies',  as: 'movies'});

    Movies.belongsToMany(Actors, {through: 'actors_movies', as: 'actors'});
    Actors.belongsToMany(Movies, {through: 'actors_movies',  as: 'movies'});

    Movies.hasMany(Reviews);
    Users.hasMany(Reviews, { foreignKey: 'userId'});
	Reviews.belongsTo(Users);
	Reviews.belongsTo(Movies);

	return {
        Users,
        Movies,
        Genres,
        Actors,
        Reviews,

        sequelize,
        Sequelize
    };
};
