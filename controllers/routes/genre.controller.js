const CrudController = require('./crud.controller');
const sender = require('../../helpers/sender.helper');

class GenreController extends CrudController {
    constructor({genreService, cacheService}) {
        super(genreService, 'genre', cacheService);

        this.getMovies = this.getMovies.bind(this);

        this.routes['/:genreId/get-movies'] = [{method: 'get', cb: this.getMovies}];

        this.registerRoutes();
    }


	/**
	 * @apiDescription Get all films by current genre
	 * @api {get} /:genreId/get-movies
	 *
	 * @apiGroup GetGenresMovies
	 * @apiParam {Number} genreId genre id
	 */
    async getMovies(req, res) {
        sender(res, await this.service.getMovies(req.params.genreId))
    }

    //TODO
    async popularGenre() {

    }
}

module.exports = GenreController;
