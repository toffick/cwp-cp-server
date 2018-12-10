const {createContainer, asClass, asValue, asFunction, Lifetime} = require('awilix');
const logger = require('log4js').getLogger();
const config = require('config');

logger.level = 'trace';

module.exports = () => {
    const container = createContainer();

    container.loadModules([
        ['services/**/*.js', {register: asClass}],
        ['controllers/routes/*.js', {register: asClass}],
        ['controllers/*.js', {register: asFunction}],
	    ['global-middlewares/*.js', {register: asFunction}],
	    ['middlewares/*.js', {register: asFunction}],
	    ['repositories/*.js', {register: asClass}],
        ['schemas/*.js', {register: asFunction}]
    ], {
        formatName: 'camelCase',
        resolverOptions: {
            lifetime: Lifetime.SINGLETON
        }
    });

    container.register({
        passport: asFunction(require('../helpers/passport.helper')),
	    context: asFunction(require('../db/main/index')),
	    contextAudit: asFunction(require('../db/audit/index'))
    });

    container.register({
        errors: asValue(require('../helpers/errors.helper')),
	    logger: asValue(logger),
	    config: asValue(config),
        Sequelize: asValue(require('sequelize')),
        roles: asValue(require('../helpers/roles.helper')),
    });
    return container;
};
