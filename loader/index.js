const {createContainer, asClass, asValue, asFunction, Lifetime} = require('awilix');
const Sequelize = require('sequelize');
const context = require('../dbContext');
const errors = require('../helpers/errors.helper');
const apiController = require('../controllers/api');
const schemas = require('../schemas');

module.exports = () => {
    const container = createContainer();

    container.loadModules([
        ['services/*.js', {register: asClass}],
        ['controllers/*.js', {register: asClass}],
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
        schemas: asFunction(schemas)
    });

    container.register({
        errors: asValue(errors),
        Sequelize: asValue(Sequelize),
        context: asFunction(context)
    });

    return container;
};
