const Joi = require('joi');

module.exports = () => ({
    id: Joi.number(),
    title: Joi.string().min(1).max(256),
    year: Joi.number().min(1900).max((new Date()).getFullYear()),
    runtime: Joi.number().min(1),
    director: Joi.string().min(1).max(256),
    plot: Joi.string().min(1).max(2048),
	posterUrl: Joi.string().min(1).max(512),
	description: Joi.string().min(1).max(2000),
	country: Joi.string().min(1).max(256),
	actors: Joi.string().min(1).max(2000),
	genres: Joi.string().min(1).max(2000),
});
