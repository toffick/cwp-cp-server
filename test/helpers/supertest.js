const container = require('../../loader')();
const server = require('../../appManager')(container);

const supertest = require('supertest');

let instance = null;

module.exports = () => instance ? instance : supertest(server);
