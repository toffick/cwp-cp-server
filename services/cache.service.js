const lru = require('lru-cache');
const hash = require('object-hash');

class CacheService {
	constructor() {
		//TODO
		this.cache = lru({max: 5, maxAge: 1000 * 30});
	}

	async set(req, data) {
		let objetString = `${req.method}${req.originalUrl}`;

		if (req.user && req.user.id) {
			objetString += req.user.id;
		}

		this.cache.set(hash(objetString), data);
	}

	async get(req) {
		return this.cache.get(hash(`${req.method}${req.originalUrl}`));
	}
}

module.exports = CacheService;
