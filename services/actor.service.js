const CrudService = require('./crud.service');

class ActorService extends CrudService {
    constructor({context, actorSchema, errors}) {
        super(context['Actors'], actorSchema, errors);
    }
}

module.exports = ActorService;