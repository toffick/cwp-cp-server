const validator = require('../helpers/validator.helper');
const config = require('config');

class Authenticator {
    constructor({errors, emailService, userService, userSchema, tokenService}) {
        this.errors = errors;
        this.emailService = emailService;
        this.schema = userSchema;
        this.userService = userService;
        this.tokenService = tokenService;
    }

    login() {

    }

    async confirmRegistration(token) {
        const verifiedResult = await this.tokenService.verify(token, config.email.token.key);

        if (verifiedResult.error) {
            switch (verifiedResult.error) {
                case 'JsonWebTokenError': {
                    return {success: false, message: 'You should use valid token in link to confirm your account'};
                }
                case 'TokenExpiredError': {
                    const user = await this.userService.read(verifiedResult.payload.id);

                    if (user.isVerified)
                        return {success: false, message: 'This account already been verified'};

                    await this.userService.delete(verifiedResult.payload.id);
                    return {success: false, message: 'You must repeat the registration'};
                }
            }
        }

        await this.userService.confirmUserByEmail(verifiedResult.payload.id);
        return {success: true};
    }

    async registration(data, serverPath) {
        this._validateBySchema(data);

        const user = await this.userService.readOne({email: data.email});
        if (user)
            throw this.errors.badRegistration;

        const createdUser = await this.userService.create(data);

        const callbackEmail = await this._getCallbackEmail(createdUser, serverPath);
        this.emailService.sendConfirmEmail(createdUser, callbackEmail);

        return {success: true, message: `Check ${data.email} and catch an email from us`};
    }

    async _getCallbackEmail({id, email}, serverPath) {
        const token = await  this.tokenService.create(
            {id},
            config.email.token.key,
            {expiresIn: config.email.token.expiresIn});

        return `${serverPath}/auth/confirm?token=${token}`;
    }

    _validateBySchema(data) {
        let validCheck = validator(this.schema, data);
        if (!validCheck.isValid) {
            throw this.errors.validError(validCheck.errors);
        }
    }
}

module.exports = Authenticator;
