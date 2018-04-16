const Joi = require('joi');

module.exports = () => ({
    id: Joi.number(),
    email: Joi.string().email(),
    password: Joi.string().min(8),
    name: Joi.string().min(1)
});
