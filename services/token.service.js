const jwt = require('jsonwebtoken');

class TokenService {

    constructor() {
        this.defaultOptions = {
            expiresIn: '1d'
        }
    }

    async create(payload, key, options) {
        return await jwt.sign(
            payload,
            key,
            {...this.defaultOptions, ...options});
    }

    async verify(token, key) {
        let retObj = {error: null};

        try {
            retObj.payload = await jwt.verify(token, key);
        }
        catch (e) {
            retObj.payload = (await jwt.decode(token, {complete: true})).payload;
            retObj.error = e.name;
        }

        return retObj;
    }
}

module.exports = TokenService;
