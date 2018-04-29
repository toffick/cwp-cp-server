const CrudController = require('./crud.controller');

class ActorController extends CrudController {
    constructor({actorService}) {
        super(actorService, 'actor');

        this.registerRoutes();
    }
}

module.exports = ActorController;
