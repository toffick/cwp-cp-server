const permissions = require('../config/permisions');

class AuthorizationService {
    constructor({roles, errors}) {
        this.roles = roles;
        this.errors = errors;
        this.permissions = permissions;
    }

    async checkPermissions(user, path, method) {
        const permissionPath = Object.keys(this.permissions).find(pathRg => path.match(new RegExp(pathRg)));
        if (!permissionPath)
            return true;

        const permission = this.permissions[permissionPath];

        const allowedRoleObj = permission.find(item => item.role === user.role.name);

        if (!allowedRoleObj)
            throw this.errors.accessDenied;

        const allowedRole = this.roles[allowedRoleObj.role];

        if (user.role.level < allowedRole.level)
            throw this.errors.accessDenied;

        if (allowedRoleObj.methods.find(allowMethod => allowMethod === method) === undefined)
            throw this.errors.methodNotAllowed;

        return true;
    }
}

module.exports = AuthorizationService;
