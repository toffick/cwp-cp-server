const wrap = require('../helpers/wrap.helper');

module.exports = ({errors}) => wrap(async (req, res, next) => {
    if (req.isAuthenticated() || req.method === 'GET') {

        next();
        return;
    }

    throw errors.unauthorized;
});
