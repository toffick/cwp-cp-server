const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

module.exports = ({context, errors}) => {

    const userRepository = context['Users'];

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        const user = await userRepository.findById(id);

        if (!user)
            done(errors.notFound);

        done(null, user);
    });

    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, async (email, password, done) => {
        const user = await userRepository.findOne({where: {email}});

        if (!user) {
            done(errors.wrongCredentials);
        } else if (!user.isVerified) {
            done(errors.accountNotVerified);
        } else if (!(await user.comparePassword(password))) {
            done(errors.wrongCredentials);
        } else {
            done(null, user);
        }
    }));

    return passport;
};
