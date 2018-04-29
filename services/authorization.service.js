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
        if (!pathObj) {
            return true;
        }

        const allowedRolesObj = pathObj.permissions.filter(item => this.roles[item.role].level <= currentUserRole.level);

        if (allowedRolesObj.length === 0) {
            throw this.errors.accessDenied;
        }

        const foundedPermission = allowedRolesObj.find((perm) => perm.methods.find(permMethod => permMethod === method));

        if (!foundedPermission) {
            throw this.errors.methodNotAllowed;
        }

        if (currentUserRole !== this.roles['ADMIN'] && foundedPermission.userProtected) {
            if(+path.split('/')[4] !== user.id)
                throw this.errors.accessDenied;
        }


        return true;
    }
}

module.exports = AuthorizationService;
