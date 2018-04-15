if (!process.env.NODE_ENV) process.env.NODE_ENV = 'development';
const container = require('./loader');
const config = require('config');

console.log(config.db.name);
console.log(process.env.NODE_ENV);

// TODO make server start
