const CrudService = require('./crud.service');
const getPagination = require('../../helpers/pagination.helper');

class ActorService extends CrudService {
	constructor({context, actorSchema, errors}) {
		super(context['Actors'], actorSchema, errors);

		this.defaults.allowedFilterProps = ['name', 'bday'];
	}

	async getMovies(actorId) {
		const actor = await super.read(actorId);
		const movies = await actor.getMovies({raw: true});

		return {
			movies
		}
	}

	async read(actorId) {
		actorId = parseInt(actorId);

		if (isNaN(actorId)) {
			throw this.errors.invalidId;
		}

		const item = await this.repository.find({
			where: {id: actorId},
			raw: true
		});

		if (!item) {
			throw this.errors.notFound;
		}

		const {movies} = await this.getMovies(actorId);

		return {...item, movies};
	}

	async readChunk(query) {
		const findOptions = this._normalizeOptions(query);
		delete findOptions.distinct;
		const {rows: actors, count} = await this.repository.findAndCountAll({
				...findOptions,
				raw: true
			}
		);
		const pagination = getPagination(count, Number(query.page) || this.defaults.readChunk.page, findOptions.limit);

		return {
			actors,
			meta: {pagination}
		}
	}

}

module.exports = ActorService;
