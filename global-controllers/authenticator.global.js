const wrap = require('../helpers/wrap.helper');

module.exports = ({errors}) => wrap(async (req, res, next) => {

    // dev
    next();
    return;

    if (req.isAuthenticated() || req.method === 'GET') {
        next();
        return;
    }

    throw errors.unauthorized;
});
