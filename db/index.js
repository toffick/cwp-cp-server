const {users, movies, genres, actors} = require('./models');
const config = require('config');

module.exports = ({Sequelize}) => {
    const sequelize = new Sequelize(config.db.name, config.db.user, config.db.password, config.db.options);

    const Users = users(Sequelize, sequelize);
    const Movies = movies(Sequelize, sequelize);
    const Genres = genres(Sequelize, sequelize);
    const Actors = actors(Sequelize, sequelize);

    Movies.belongsToMany(Genres, {through: 'genres_movies', as: 'Genres'});
    Genres.belongsToMany(Movies, {through: 'genres_movies',  as: 'Movies'});

    Movies.belongsToMany(Actors, {through: 'actors_movies', as: 'Actors'});
    Actors.belongsToMany(Movies, {through: 'actors_movies',  as: 'Movies'});

    return {
        Users,
        Movies,
        Genres,
        Actors,

        sequelize,
        Sequelize
    };
};
