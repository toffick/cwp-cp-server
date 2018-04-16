const {Router} = require('express');
const wrap = require('../helpers/wrap.helper');

module.exports = ({authenticatorService}) => {
    const router = Router({mergeParams: true});

    router.post('/registration', wrap(async (req, res) => {
        const serverPath = req.protocol + '://' + req.get('host');
        const data = await authenticatorService.registration(req.body, serverPath);

        res.json(data);
    }));

    router.get('/confirm', wrap(async (req, res) => {
        if (req.query.token) {
            const data = await  authenticatorService.confirmRegistration(req.query.token);
            res.json(data);
        } else {
            res.json({success: false, message: "Set token"});
        }

    }));

    router.post('/login', wrap(async (req, res) => {
        const data = authenticatorService.login(req.body);

        res.json(data);
    }));

    return router;
};
