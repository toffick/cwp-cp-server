const {createContainer, asClass, asValue, asFunction, Lifetime} = require('awilix');
const Sequelize = require('sequelize');
const context = require('../dbContext');
const errors = require('../helpers/errors.helper');
const apiController = require('../controllers/api');

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
    });

    container.register({
        errors: asValue(errors),
        Sequelize: asValue(Sequelize),
        context: asFunction(context)
    });

    return container;
};
