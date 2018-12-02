const validator = require('../../helpers/validator.helper');
const sqs = require('sequelize-querystring');

class CrudService {
	constructor(repository, schema, errors) {
		this.repository = repository;
		this.errors = errors;
		this.schema = schema;

		this.defaults = {
			readChunk: {
				limit: 5,
				page: 1,
				sortOrder: 'asc',
				sortField: 'id',
				distinct: true
			},
			allowedFilterProps: ['id']
		};
	}

	readChunk(query) {
		const findOptions = this._normalizeOptions(query);

		return this.repository.findAll(
			findOptions
		)
	}

	async read(id) {
		id = parseInt(id);

		if (isNaN(id)) {
			throw this.errors.invalidId;
		}

		const item = await this.repository.findById(id);

		if (!item) {
			throw this.errors.notFound;
		}

		return item;
	}

	async readOne(where) {
		return await this.repository.findOne({where});
	}

	async create(data) {
		this._validateBySchema(data);

		const item = await this.repository.create(data);

		return item.get({plain: true});
	}

	async update(id, data) {
		this._validateBySchema(data);

		await this.repository.update(data, {where: {id: id}, limit: 1});

		return this.read(id);
	}

	async delete(id) {
		return this.repository.destroy({where: {id: id}});
	}

	_validateBySchema(data) {
		let validCheck = validator(this.schema, data);
		if (!validCheck.isValid) {
			throw this.errors.validError(validCheck.errors);
		}
	}

	/**
	 *Create object for find chunk
	 * @param query {String}
	 * query string from request
	 *
	 * @param defOpt {Object} (optional)
	 * additional options
	 *
	 * @return {object} object to find
	 */
	_normalizeOptions(query) {

		let limit = Number(query.limit) || this.defaults.readChunk.limit;
		let page = Number(query.page) || this.defaults.readChunk.page;

		if (page < 1) {
			page = this.defaults.readChunk.page;
		}

		if (limit < 1) {
			limit = this.defaults.readChunk.limit;
		}

		const offset = (page - 1) * limit;

		return {
			...this.defaults.readChunk,
			where: query.filter ? sqs.find(query.filter, this.defaults.allowedFilterProps) : {},
			limit,
			offset,
			order: query.sort ? sqs.sort(query.sort) : []
		};
	}
}

module.exports = CrudService;
