const permissions = require('../config/permisions');

class AuthorizationService {
    constructor({roles, errors}) {
        this.roles = roles;
        this.errors = errors;
        this.permissions = permissions;
    }

    async checkPermissions(user, path, method) {
        const currentUserRole = user && user.role || this.roles['ANON'];
        const pathObj = this.permissions.find(item => item.pathRegExp.test(path));
        if (!pathObj)
            return true;

        const allowedRoleObj = pathObj.permissions.filter(item => this.roles[item.role].level <= currentUserRole.level);

        if (allowedRoleObj.length === 0)
            throw this.errors.accessDenied;

        let foundedPermission = false;

        allowedRoleObj.forEach(perm => {
            if (perm.methods.findIndex(permMethod => permMethod === method) !== -1)
                foundedPermission = true;
        });

        if (!foundedPermission)
            throw this.errors.methodNotAllowed;

        return true;
    }
}

module.exports = AuthorizationService;
