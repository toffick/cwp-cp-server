const {Router} = require('express');
const wrap = require('../helpers/wrap.helper');

module.exports = ({authenticatorService, logger, authenticatorGlobal}) => {
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
        authenticatorService.authenticate(),
        (req, res) => {
            logger.trace(`passport/login -> ${req.user.email}[${req.user.role}] authenticated`);
            res.json({success: true, user: req.user});
        });


    router.get('/logout', (req, res) => {
        if (!req.isAuthenticated())
            throw this.errors.unauthorized;

        //TODO logger trace does not work
        logger.trace(`passport/logout -> ${req.user.email}[${req.user.role}] logout from system`);
        req.logout();
        res.json({success: true});
    });

    return router;
};
