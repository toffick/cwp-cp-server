const CrudController = require('./crud.controller');
const sender = require('../../helpers/sender.helper');

class ActorController extends CrudController {
    constructor({actorService, cacheService}) {
        super(actorService, 'actor', cacheService);

        this.getMovies = this.getMovies.bind(this);

        this.routes['/:actorId/get-movies'] = [{method: 'get', cb: this.getMovies}];

        this.registerRoutes();
    }

    async getMovies(req, res) {
        sender(res, await this.service.getMovies(req.params.actorId))
    }

}

module.exports = ActorController;
