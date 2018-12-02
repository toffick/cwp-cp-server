const {Router} = require('express');
const wrap = require('../../helpers/wrap.helper');
const sender = require('../../helpers/sender.helper');

class CrudController {
    constructor(service, paramName, cacheService) {
        this.service = service;
        this.paramName = `${paramName}Id`;
        this.cacheService = cacheService;

        this.readAll = this.readAll.bind(this);
        this.read = this.read.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);

        this.router = Router({mergeParams: true});
        this.routes = {
            '/': [
                {method: 'get', cb: this.readAll},
                {method: 'post', cb: this.create}
            ],
            [`/:${this.paramName}`]: [
                {method: 'get', cb: this.read},
                {method: 'put', cb: this.update},
                {method: 'delete', cb: this.delete}
            ]
        };
    }

    async readAll(req, res) {
        const data = await this.service.readChunk(req.query);
        this.cacheService.set(req, {success: true, payload: data});
        sender(res, data);
    }

    async read(req, res) {
        const data = await this.service.read(req.params[this.paramName]);
        this.cacheService.set(req, {success: true, payload: data});
        sender(res, data);
    }

    async create(req, res) {
        sender(res, await this.service.create(req.body));
    }

    async update(req, res) {
        sender(res, await this.service.update(req.params[this.paramName], req.body));
    }

    async delete(req, res) {
        sender(res, await this.service.delete(req.params[this.paramName]));
    }

    registerRoutes() {

        Object.keys(this.routes).forEach(route => {
            let handlers = this.routes[route];

            if (!handlers || !Array.isArray(handlers)) return;

            for (let handler of handlers) {
                this.router[handler.method](route, wrap(handler.cb));
            }
        });
    }
}

module.exports = CrudController;
