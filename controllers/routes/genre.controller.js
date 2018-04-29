const CrudController = require('./crud.controller');

class GenreController extends CrudController {
    constructor({genreService}) {
        super(genreService, 'genre');

        this.registerRoutes();
    }
}

module.exports = GenreController;
