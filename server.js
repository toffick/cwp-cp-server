if (!process.env.NODE_ENV) process.env.NODE_ENV = 'development';
const loader = require('./loader');
const config = require('config');
const app = require('./appManager');
const tempDataToDb = require('./helpers/tempDataToDb.helper');

(async function () {
    const container = loader();
    const server = await app(container);

    await tempDataToDb(container.resolve('context'));

    server.listen(process.env.PORT || config.app.port, () => container.resolve('logger').log('Server running'));
})();
