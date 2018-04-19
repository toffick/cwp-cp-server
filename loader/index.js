const {createContainer, asClass, asValue, asFunction, Lifetime} = require('awilix');
const logger = require('log4js').getLogger();

logger.level = 'debug';

module.exports = () => {
    const container = createContainer();

    container.loadModules([
        ['services/*.js', {register: asClass}],
        ['controllers/routes/*.js', {register: asClass}],
        ['controllers/*.js', {register: asFunction}],
        ['global-controllers/*.js', {register: asFunction}],
        ['schemas/*.js', {register: asFunction}]
    ], {
        formatName: 'camelCase',
        resolverOptions: {
            lifetime: Lifetime.SINGLETON
        }
    });

    container.register({
        passport: asFunction(require('../helpers/passport.helper')),
        context: asFunction(require('../db'))
    });

    container.register({
        errors: asValue(require('../helpers/errors.helper')),
        logger: asValue(logger),
        Sequelize: asValue(require('sequelize')),
        roles: asValue(require('../helpers/roles.helper')),
    });
    return container;
};
