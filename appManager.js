const express = require('express');
const config = require('config');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const session = require('express-session');
const cors = require("cors");

module.exports = (container) => {
    const app = express();

    app.use(express.static('public'));
    app.use(morgan('tiny'));
    app.use(bodyParser.json());
    app.use(session({
        secret: config.session.key,
        resave: false,
        saveUninitialized: false,
    }));

    if (config.app.cors) {
        let corsOptions = {
            origin: (origin, callback) => {
                callback(null, true);
            },
            credentials: true,
            methods: ["GET", "PUT", "POST", "OPTIONS", "DELETE"],
            headers: ["x-user", "X-Signature", "accept", "content-type"],
        };

        app.use(cors(corsOptions));
        app.options("*", cors());
    }


    app.use(container.resolve('passport').initialize());
    app.use(container.resolve('passport').session());

    app.use('/auth', container.resolve('authController'));
    app.use(container.resolve('authenticatorGlobal'));
    app.use(container.resolve('authorizationGlobal'));
    app.use(container.resolve('cacheGlobal'));
    app.use('/api/v1', container.resolve('apiController'));
    app.use(container.resolve('errorGlobal'));
    return app;
};
