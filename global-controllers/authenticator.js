const wrap = require('../helpers/wrap.helper');

module.exports = (userService) => wrap(async (req, res, next) => {
    let userId = req.signedCookies[config.cookie.auth];

    if (userId) {
        req.user = await usersService.get(userId);
    }

    next();
})
