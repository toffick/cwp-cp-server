const {Router} = require('express');
const wrap = require('../helpers/wrap.helper');

//TODO validation
module.exports = ({authenticatorService, logger, errors}) => {
    const router = Router({mergeParams: true});

    router.post('/registration', wrap(async (req, res) => {
        const serverPath = req.protocol + '://' + req.get('host');

        res.json(await authenticatorService.registration(req.body, serverPath));
    }));

    router.get('/confirm', wrap(async (req, res) => {
        if (!req.query.token) {
            res.json({success: false, message: "Set token"});
            return;
        }

        res.json(await authenticatorService.confirmRegistration(req.query.token));
    }));

    router.post('/login',
        authenticatorService.login(),
        (req, res) => {
            logger.trace(`passport/login -> ${req.user.email}[${req.user.role}] authenticated`);
            res.json({success: true, user: req.user});
        });

    router.post('/check-auth', (req, res) => {
        res.json({success: req.isAuthenticated(), user: req.user});
    });

    router.post('/logout', (req, res) => {
        if (!req.isAuthenticated())
            throw errors.unauthorized;

        logger.trace(`passport/logout -> ${req.user.email}[${req.user.role}] logout from system`);
        req.logout();
        res.json({success: true});
    });

    return router;
};
