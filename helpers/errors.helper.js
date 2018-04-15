const errors = {
    invalidId: {
        message: 'Invalid ID',
        code: 'invalid_id',
        status: 400
    },
    invalidToken: {
        message: 'Invalid user token',
        code: 'invalid_token',
        status: 400
    },
    notFound: {
        message: 'Entity not found',
        code: 'entity_not_found',
        status: 404
    },
    wrongCredentials: {
        message: 'Email or password are wrong',
        code: 'wrong_credentials',
        status: 404
    },
    accessDenied: {
        message: 'Access denied',
        code: 'access_denied',
        status: 403
    },
    invalidData: {
        message: 'Invalid input data',
        code: 'validate_error',
        status: 400
    },
    emptyData: {
        message: 'Empty input data',
        code: 'empty_data',
        status: 400
    },
    customError: (msg, code, status) =>
        ({
            msg,
            code,
            status
        })
};

const express = require('express');

express.response.error = function (error) {
    if (!error.code) {
        error = errors.customError(
            error.toString(),
            'server_error',
            500
        )
    }

    this.status(error.status).json(error);
};


module.exports = errors;
