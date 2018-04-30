const CrudService = require('./crud.service');

class MovieService extends CrudService {
    constructor({context, movieSchema, errors}) {
        super(context['Movies'], movieSchema, errors);
        this.actorsRepository = context['Actors'];
        this.genresRepository = context['Genres'];
        this.reviewsRepository = context['Reviews'];
    }

    async read(movieId) {
        movieId = parseInt(movieId);

        if (isNaN(movieId)) {
            throw this.errors.invalidId;
        }

        const item = await this.repository.find({
            where: {id: movieId},
            include: [{
                model: this.genresRepository,
                as: 'genres'
            }, {
                model: this.actorsRepository,
                as: 'actors'
            }, {
                model: this.reviewsRepository,
                as: 'reviews'
            }]
        });

        if (!item) {
            throw this.errors.notFound;
        }

        return item;
    }
}

module.exports = MovieService;
