const Joi = require('joi');

module.exports = () => ({
    id: Joi.number(),
    text: Joi.string().min(1).max(2048),
    datestamp: Joi.number().min(0),
    mark: Joi.number().min(0).max(10),
    movieId: Joi.number()
});
