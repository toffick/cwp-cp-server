const CrudService = require('./crud.service');

class GenreService extends CrudService {
    constructor({context, genreSchema, errors}) {
        super(context['Genres'], genreSchema, errors);
        this.defaults.allowedFilterProps =  ['name'];
    }

    async getMovies(genreId){
        const genre = await  super.read(genreId);
        const movies = await genre.getMovies();

        return {
            movies
        }
    }
}

module.exports = GenreService;
