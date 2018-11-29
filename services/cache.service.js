const lru = require('lru-cache');
const hash = require('object-hash');

class CacheService {
    constructor() {
        //TODO
	    this.cache = lru({ max: 5, maxAge: 1000 * 30 });
    }

    async set(req, data) {
        //TODO можно не хэшировать
        this.cache.set(hash(`${req.method}${req.originalUrl}`), data);
    }

    async get(req) {
        return this.cache.get(hash(`${req.method}${req.originalUrl}`));
    }
}

module.exports = CacheService;
