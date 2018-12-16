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

	async del(req) {
		let commonRawKey = this._rawStrginSerializator(req);

		return this.cache.del(hash(commonRawKey));
	}

	_rawStrginSerializator(req) {
		// return typeof req === 'string' ? req : `${req.method}${req.originalUrl}${user && user.id ? user.id : ''}`;
		return typeof req === 'string' ? req : `${req.method}${req.originalUrl}`;
	}
}

module.exports = CacheService;
