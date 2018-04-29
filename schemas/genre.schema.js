const Joi = require('joi');

module.exports = () => ({
    id: Joi.number(),
    name: Joi.string().min(1).max(128)
});
