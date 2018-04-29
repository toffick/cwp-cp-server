if (!process.env.NODE_ENV) process.env.NODE_ENV = 'development';
const container = require('./loader')();
const config = require('config');
const server = require('./appManager')(container);
const tempDataToDb = require('./tempData/tempDataToDb.helper');

(async () => {
    const db = container.resolve('context');
    const logger = container.resolve('logger');

    try {
        await db.sequelize.sync({force: true});
        logger.info(`Database successfully created`);

        await tempDataToDb(db);
        logger.info('tempDataToDb -> the test data was added to db');

        server.listen(process.env.PORT || config.app.port,
            () => logger.info('Server running'));
    }
    catch (e) {
        logger.error(`start server error: ${e}`);
    }
})();
