const CrudService = require('./crud.service');

class UserService extends CrudService {
	constructor({context, userSchema, errors, roles}) {
		super(context['Users'], userSchema, errors);
		this.roles = roles;
		this.moviesRepository = context['Movies'];
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
		if (!role) throw this.errors.undefinedRole;

		await this.repository.update({role: role.name}, {where: {id: userId}, limit: 1});

		const user = await  this.read(userId);
		return {success: true, message: `user ${user.name} got the ${role.name} role`}
	}

	async getProfile(userId) {
		const user = await  super.read(userId);
		const reviews = await user.getReviews({
			order: [['datestamp', 'DESC']],
			include: [{
				model: this.moviesRepository,
				attributes: ['id', 'title', 'year']
			}],

		});

		const {email, name, role} = user;
		return {
			email,
			name,
			role,
			reviews
		}
	}

}

module.exports = UserService;
