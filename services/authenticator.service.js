const config = require('config');

class Authenticator {
    constructor({errors, emailService, userService, tokenService, passport}) {
        this.errors = errors;
        this.emailService = emailService;
        this.userService = userService;
        this.tokenService = tokenService;
        this.passport = passport;
    }

    login() {
        return this.passport.authenticate('local', {failureRedirect: '/sign-in'});
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
                        return {success: false, message: 'This account has already been verified'};

                    await this.userService.delete(verifiedResult.payload.id);
                    return {success: false, message: 'You must repeat the registration'};
                }
            }
        }

        await this.userService.confirmUserByEmail(verifiedResult.payload.id);
        return {success: true, message: "success account confirmation"};
    }

    async registration(data, serverPath) {
        const user = await this.userService.readOne({email: data.email.toLowerCase()});
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

}

module.exports = Authenticator;
