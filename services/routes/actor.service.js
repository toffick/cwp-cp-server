const CrudService = require('./crud.service');

class ActorService extends CrudService {
    constructor({context, actorSchema, errors}) {
        super(context['Actors'], actorSchema, errors);
        this.defaults.allowedFilterProps =  ['name', 'bday'];
    }

    async getMovies(actorId){
        const actor = await  super.read(actorId);
        const movies = await actor.getMovies();

        return {
            movies
        }
    }
}

module.exports = ActorService;
