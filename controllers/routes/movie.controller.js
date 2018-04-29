const CrudController = require('./crud.controller');

class MovieController extends CrudController {
    constructor({movieService, cacheService}) {
        super(movieService, 'movie', cacheService);

        this.registerRoutes();
    }
}

module.exports = MovieController;
