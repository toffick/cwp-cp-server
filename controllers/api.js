const {Router} = require('express');

module.exports = ({userController}) => {
    const router = Router({mergeParams: true});

    router.use('/users', userController.router);

    return router;
};
