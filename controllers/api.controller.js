const {Router} = require('express');

module.exports = ({userController, actorController, movieController, genreController, reviewController}) => {
    const router = Router({mergeParams: true});

    router.use('/users', userController.router);
    router.use('/actors', actorController.router);
    router.use('/genres', genreController.router);
    router.use('/movies', movieController.router);
    router.use('/reviews', reviewController.router);

    return router;
};
