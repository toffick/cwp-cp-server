const CrudService = require('./crud.service');

class MovieService extends CrudService {
    constructor({context, movieSchema, errors}) {
        super(context['Movies'], movieSchema, errors);
    }
}

module.exports = MovieService;
