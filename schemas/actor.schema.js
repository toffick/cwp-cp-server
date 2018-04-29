const Joi = require('joi');

module.exports = () => ({
    id: Joi.number(),
    name: Joi.string().min(1).max(256),
    photoUrl: Joi.string().min(1).max(512),
    bday: Joi.string().min(1).max(11),
});
