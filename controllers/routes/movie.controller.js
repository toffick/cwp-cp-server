const CrudController = require('./crud.controller');

class MovieController extends CrudController {
    constructor({movieService}) {
        super(movieService, 'movie');

        this.registerRoutes();
    }
}

module.exports = MovieController;
