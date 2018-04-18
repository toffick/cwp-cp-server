const wrap = require('../helpers/wrap.helper');

module.exports = ({authorizationService}) => wrap(async (req, res, next) => {
    await authorizationService.checkPermissions(req.user, req.path, req.method);

    next();
});
