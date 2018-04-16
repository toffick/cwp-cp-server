const validator = require('../helpers/validator.helper');
const config = require('config');
const jwt = require('jsonwebtoken');

class Authenticator {
    constructor({errors, emailService, userService, userSchema}) {
        this.errors = errors;
        this.emailService = emailService;
        this.schema = userSchema;
        this.userService = userService;
    }


    async registration(data, serverPath) {
        this._validateBySchema(data);

        const user = await this.userService.readOne({email: data.email});
        if (user) throw this.errors.badRegistration;

        const createdUser = await this.userService.create(data);

        const callbackEmail = this._getCallbackEmail(createdUser, serverPath);
        this.emailService.sendConfirmEmail(createdUser, callbackEmail);

        return {success: true, message: `Check ${data.email} and catch email from us`};
    }

    login() {

    }

    // check if token data is invalid  => use right token
    // chack if expiresIn is invalid => remome user from db
    async confirmRegistration(token) {
        try {
            const {id, email} = await jwt.verify(token, config.email.token.key);
            await this.userService.confirmUserByEmail(id);

            return {success: true};
        }
        catch (e) {
            throw this.errors.invalidToken;
        }

    }

    _getCallbackEmail(user, serverPath) {
        const token = this._createConfirmationToken(user);

        return `${serverPath}/auth/confirm?token=${token}`;
    }

    _createConfirmationToken({id, email}) {
        return jwt.sign(
            {id, email},
            config.email.token.key,
            {expiresIn: config.email.token.expiresIn});
    }

    _validateBySchema(data) {
        let validCheck = validator(this.schema, data);
        if (!validCheck.isValid) {
            throw this.errors.validError(validCheck.errors);
        }
    }
}

module.exports = Authenticator;
