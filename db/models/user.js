const crypto = require('crypto')
const Sequelize = require('sequelize')
const _ = require('lodash');
const db = require('../db')

const User = db.define('user', {
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    name: {
        type: Sequelize.VIRTUAL,
        get() {
            return this.getDataValue('firstName') + ' ' + this.getDataValue('lastName')
        }
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: Sequelize.STRING
    },
    salt: {
        type: Sequelize.STRING
    },
    isAdmin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
})

module.exports = User

User.prototype.correctPassword = function (candidatePassword) {
    return User.encryptPassword(candidatePassword, this.salt) === this.password
};

User.prototype.sanitize = function () {
    return _.omit(this.toJSON(), ['password', 'salt']);
};



User.generateSalt = function () {
    return crypto.randomBytes(16).toString('base64')
};


User.encryptPassword = function (plainText, salt) {
    return crypto
        .createHash('RSA-SHA256')
        .update(plainText)
        .update(salt)
        .digest('hex');
};

const setSaltAndPassword = user => {

    if (user.changed('password') ){
        user.salt = User.generateSalt()
        user.password = User.encryptPassword(user.password, user.salt)
    }
}

User.beforeCreate(setSaltAndPassword);
User.beforeUpdate(setSaltAndPassword);
