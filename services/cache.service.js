const lru = require('lru-cache');
const hash = require('object-hash');

class CacheService {
	constructor() {
		//TODO
		this.cache = lru({max: 5, maxAge: 1000 * 30});
	}

	async set(req, data) {
		let raw = this._rawStrginSerializator(req);

		this.cache.set(hash(raw), data);
	}

	async get(req) {
		let raw = this._rawStrginSerializator(req);

		return this.cache.get(hash(raw));
	}

	_rawStrginSerializator(req) {
		return typeof req === 'string' ? req : `${req.method}${req.originalUrl}${req.user && req.user.id ? req.user.id : ''}`;
	}
}

module.exports = CacheService;
