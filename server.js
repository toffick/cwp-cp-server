if (!process.env.NODE_ENV) process.env.NODE_ENV = 'development';
const container = require('./loader')();
const config = require('config');
const server = require('./appManager')(container);
const tempDataToDb = require('./tempData/tempDataToDb.helper');

(async () => {
    const db = container.resolve('context');
    const logger = container.resolve('logger');

    db.sequelize.sync({force: true})
        .then(() => {
            logger.info('Database connected');
            return tempDataToDb(db, logger);
        })
        .then(() => {
            server.listen(process.env.PORT || config.app.port, () => container.resolve('logger').info('Server running'));
        }).catch((err) => {
        logger.error(err);
    });

})();
