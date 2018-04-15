const bcrypt = require('bcryptjs');

module.exports = (Sequelize, sequelize) => {
    const model = sequelize.define('users', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            email: Sequelize.STRING,
            password: Sequelize.STRING,
            isVerified: {type: Sequelize.BOOLEAN, default: false},
        },
        {
            hooks: {
                beforeCreate: (user) => {
                    return bcrypt.genSalt(11)
                        .then((salt) => bcrypt.hash(user.password, salt))
                        .then((hash) => user.password = hash);
                }
            }
        }
    );

    model.prototype.comparePassword = async (comparePassword) => {
        return bcrypt.compare(comparePassword, this.getDataValue('password'));
    };

    return model;
};
