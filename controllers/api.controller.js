const {Router} = require('express');

/**
 *
 * @param {UserController} userController
 * @param {ActorController} actorController
 * @param {MovieController} movieController
 * @param {GenreController} genreController
 * @return {*}
 */
module.exports = ({userController, actorController, movieController, genreController}) => {
    const router = Router({mergeParams: true});

    router.use('/users', userController.router);
    router.use('/actors', actorController.router);
    router.use('/genres', genreController.router);
    router.use('/movies', movieController.router);

    return router;
};
