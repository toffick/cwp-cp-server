const wrap = require('../helpers/wrap.helper');

module.exports = ({cacheService, logger}) => wrap(async (req, res, next) => {
    const cached = await cacheService.get(req);
    if (cached) {
        logger.trace(req.originalUrl, 'FROM CACHE');
        return res.json(cached);
    }

    next();
});
