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
    badRegistration: {
        message: 'The email address you have entered is already associated with another account',
        code: 'bad_registration_data',
        status: 400
    },
    unauthorized: {
        message: 'Unauthorized',
        code: 'unauthorized',
        status: 401
    },
    accountNotVerified: {
        message: 'Please confirm your account by link in email',
        code: 'account not verified',
        status: 403
    },
    accessDenied: {
        message: 'Access denied',
        code: 'access_denied',
        status: 403
    },
    wrongCredentials: {
        message: 'Email or password are wrong',
        code: 'wrong_credentials',
        status: 403
    },
    undefinedRole: {
        message: 'Role not fount',
        code: 'role_not_found',
        status: 404
    },
    notFound: {
        message: 'Entity not found',
        code: 'entity_not_found',
        status: 404
    },
    methodNotAllowed: {
        message: 'Method not allowed with this path',
        code: 'method_not_allowed',
        status: 405
    },
    validError: (msg) => ({
        msg,
        code: 'validate_error',
        status: 400
    }),
    customError: (msg, code, status) =>
        ({
            msg,
            code,
            status
        })
};

module.exports = errors;

const express = require('express');

express.response.error = function (error) {
    if (!error.code) {
        error = errors.customError(error.toString(), 'server_error', 500)
    }

    this.status(error.status).json({success: false, error});
};

