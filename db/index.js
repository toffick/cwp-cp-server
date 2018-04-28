const {users, movies, genres} = require('./models');
const config = require('config');

module.exports = ({Sequelize}) => {
    const sequelize = new Sequelize(config.db.name, config.db.user, config.db.password, config.db.options);

    const Users = users(Sequelize, sequelize);
    const Movies = movies(Sequelize, sequelize);
    const Genres = genres(Sequelize, sequelize);

    Movies.belongsToMany(Genres, {through: 'movies_genres'});
    Genres.belongsToMany(Movies, {through: 'movies_genres'});

    return {
        Users,
        Movies,
        Genres,

        sequelize,
        Sequelize
    };
};

//TODO ошибка добавления
