const express = require('express');
const cookieParser = require('cookie-parser');
const config = require('config');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const session = require('express-session');

// TODO добавить нормальные ответы для auth
// TODO следующий этап - РОЛИ
// TODO потом создание архитектуры(фильмы, актеры, рецензии и т.д.)

module.exports = (container) => {
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

    app.use('/auth', container.resolve('authController'));
    app.use('/api/v1', container.resolve('apiController'));
    app.use(container.resolve('errorGlobal'));

    return app;
};
