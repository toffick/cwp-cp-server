const CrudService = require('./crud.service');

class UserService extends CrudService {
    constructor({context, userSchema, errors, roles}) {
        super(context['Users'], userSchema, errors);
        this.roles = roles;
    }

    async confirmUserByEmail(id) {
        await this.repository.update({isVerified: true}, {where: {id}, limit: 1});

        return this.read(id);
    }

    async create(data) {
        this._validateBySchema(data);

        data.roleLevel = 1;
        const item = await this.repository.create(data);

        return item.get({plain: true});
    }

    async changeRole(userId, roleName) {
        const role = this.roles[roleName.toUpperCase()];
        if(!role) throw this.errors.undefinedRole;

        await this.repository.update({roleLevel: role.level}, {where: {id: userId}, limit: 1});

        const user = await  this.read(userId);
        return {success: true, message: `user ${user.name} got the ${role.name} role`}
    }

}

module.exports = UserService;
