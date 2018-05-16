if (!process.env.NODE_ENV) process.env.NODE_ENV = 'development';
const container = require('./loader')();
const config = require('config');
const server = require('./appManager')(container);
const tempDataToDb = require('./tempData/tempDataToDb.helper');

(async () => {
    const db = container.resolve('context');
    const logger = container.resolve('logger');

    const forceFl = false;
    try {
        await db.sequelize.sync({force: forceFl});
        logger.info(`Database successfully created`);

        if (forceFl) {
            await tempDataToDb(db);
            logger.info('tempDataToDb -> the test data was added to db');
        }

        server.listen(process.env.PORT || config.app.port,
            () => logger.info('Server running'));
    }
    catch (e) {
        logger.error(`start server error: ${e}`);
    }
})();

//p1RqQB!W3X(zs)Sk
