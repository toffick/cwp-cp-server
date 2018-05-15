const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

module.exports = ({context, errors, roles}) => {

	const userRepository = context['Users'];

	passport.serializeUser((user, done) => {
		done(null, user.id);
	});

	passport.deserializeUser(async (id, done) => {
		try {
			const user = await userRepository.findById(id);

			if (!user) {
				done(errors.notFound);
				return;
			}

			user.role = roles[user.role];
			done(null, user);
		} catch (e) {
			done(e);
		}
	});

	passport.use(new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password'
	}, async (email, password, done) => {
		try {
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
		} catch (e) {
			done(e);
		}
	}));

	return passport;
};
