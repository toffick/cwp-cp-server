const {Router} = require('express');

module.exports = ({userController}) => {
    const router = Router({mergeParams: true});

    router.use((req, res, next) => {
        req.isAuthenticated()
            ? next()
            : res.json({unauthorized: true});
    });

    router.use('/users', userController.router);

    return router;
};
