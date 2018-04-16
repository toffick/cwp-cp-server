const {Router} = require('express');

module.exports = ({authenticatorService}) => {
    const router = Router({mergeParams: true});

    router.post('/registration', async (req, res) => {
        const serverPath = req.protocol + '://' + req.get('host');
        const data = await authenticatorService.registration(req.body, serverPath);

        res.json(data);
    });

    router.get('/confirm', async (req, res) => {
        const data = await  authenticatorService.confirmRegistration(req.query.token);

        res.json(data);
    });

    router.post('/login', async (req, res) => {
        const data = authenticatorService.login(req.body);

        res.json(data);
    });

    return router;
};
