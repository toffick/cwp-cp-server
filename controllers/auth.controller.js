const {Router} = require('express');
const wrap = require('../helpers/wrap.helper');
const sender = require('../helpers/sender.helper');

//TODO validation
module.exports = ({authenticatorService, logger, errors}) => {
    const router = Router({mergeParams: true});

    router.post('/registration', wrap(async (req, res) => {
        const serverPath = req.protocol + '://' + req.get('host');

        sender(res, await authenticatorService.registration(req.body, serverPath))
    }));

    router.get('/confirm', wrap(async (req, res) => {
        if (!req.query.token) {
            sender(res, {message: "Set token"}, 405);
            return;
        }

        const result = await authenticatorService.confirmRegistration(req.query.token);
        if (result.success)
            res.redirect('/');
        else
            sender(res,result);
    }));

    router.post('/login',
        authenticatorService.login(),
        (req, res) => {
            logger.trace(`passport/login -> ${req.user.email}[${req.user.role}] authenticated`);
            sender(res,{user: req.user});
        });

    router.post('/check-auth', (req, res) => {
        res.json({success: req.isAuthenticated(), user: req.user});
    });

    router.post('/logout', (req, res) => {
        if (!req.isAuthenticated())
            throw errors.unauthorized;

        logger.trace(`passport/logout -> ${req.user.email}[${req.user.role}] logout from system`);
        req.logout();
        sender(res);
    });

    return router;
};
