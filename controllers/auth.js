const {Router} = require('express');
const wrap = require('../helpers/wrap.helper');

module.exports = ({authenticatorService}) => {
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
            res.json({success: true});
        });


    router.get('/logout', (req, res) => {
        req.logout();
        res.json({success: true});
    });

    return router;
};
