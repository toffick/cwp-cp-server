const CrudService = require('./crud.service');

class UserService extends CrudService {
    constructor({context, userSchema, errors}) {
        super(context['Users'], userSchema, errors);
    }

    async confirmUserByEmail(id) {
        await this.repository.update({isVerified: true}, {where: {id}, limit: 1});

        return this.read(id);
    }
}

module.exports = UserService;
