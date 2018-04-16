const {createContainer, asClass, asValue, asFunction, Lifetime} = require('awilix');
const Sequelize = require('sequelize');
const context = require('../db');
const errors = require('../helpers/errors.helper');
const apiController = require('../controllers/api');
const authController = require('../controllers/auth');
const passport = require('../helpers/passport.helper');
const logger = require('winston');

module.exports = () => {
    const container = createContainer();

    container.loadModules([
        ['services/*.js', {register: asClass}],
        ['controllers/routes/*.js', {register: asClass}],
        ['global-controllers/*.js', {register: asFunction}],
        ['schemas/*.js', {register: asFunction}]
    ], {
        formatName: 'camelCase',
        resolverOptions: {
            lifetime: Lifetime.SINGLETON
        }
    });

    container.register({
        apiController: asFunction(apiController).singleton(),
        authController: asFunction(authController).singleton(),
    });

    container.register({
        errors: asValue(errors),
        passport: asFunction(passport),
        logger: asValue(logger),
        Sequelize: asValue(Sequelize),
        context: asFunction(context)
    });

    return container;
};
