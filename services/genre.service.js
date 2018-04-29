const CrudService = require('./crud.service');

class GenreService extends CrudService {
    constructor({context, genreSchema, errors}) {
        super(context['Genres'], genreSchema, errors);
    }
}

module.exports = GenreService;
