const express = require('express');
const cookieParser = require('cookie-parser');
const config = require('config');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const session = require('express-session');

module.exports = async (container) => {
    await container.resolve('context').sequelize.sync({force: true});

    const app = express();

    app.use(express.static('public'));
    app.use(morgan('tiny'));
    app.use(cookieParser(config.cookie.key));
    app.use(bodyParser.json());
    app.use(session({
        secret: config.session.key,
        resave: false,
        saveUninitialized: false
    }));

    app.use(container.resolve('passport').initialize());
    app.use(container.resolve('passport').session());

    app.get('/', (req, res)=>{
        res.send('Hello, esli ti ne Lena');
    });

    app.use('/auth', container.resolve('authController'));
    app.use('/api/v1', container.resolve('apiController'));
    app.use(container.resolve('errorGlobal'));

    return app;
};