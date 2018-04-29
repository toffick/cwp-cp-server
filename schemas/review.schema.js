const Joi = require('joi');

module.exports = () => ({
    id: Joi.number(),
    text: Joi.string().min(1).max(256),
    datestamp: Joi.number().min(0),
    rating: Joi.number().min(0).max(10),
});
