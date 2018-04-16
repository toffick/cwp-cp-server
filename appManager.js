const express = require('express');
const cookieParser = require('cookie-parser');
const config = require('config');
const bodyParser = require('body-parser');
const morgan = require('morgan');

module.exports = async (container) => {
    await container.resolve('context').sequelize.sync({force: true});

    const app = express();

    app.use(express.static('public'));
    app.use(morgan('tiny'));
    app.use(cookieParser(config.cookie.key));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded());
    app.use(express.session({ secret: 'SECRET' }));

    app.use(passport.initialize());
    app.use(passport.session());
    
    app.use('/auth', container.resolve('authController'));
    app.use('/api/v1', container.resolve('apiController'));
    app.use(container.resolve('errorGlobal'));

    return app;
};
