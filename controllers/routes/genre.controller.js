const CrudController = require('./crud.controller');

class GenreController extends CrudController {
    constructor({genreService, cacheService}) {
        super(genreService, 'genre', cacheService);

        this.getMovies = this.getMovies.bind(this);

        this.routes['/:genreId/get-movies'] = [{method: 'get', cb: this.getMovies}];

        this.registerRoutes();
    }

    async getMovies(req, res) {
        res.json(await this.service.getMovies(req.params.genreId));
    }

    async popularGenre() {

    }
}

module.exports = GenreController;
