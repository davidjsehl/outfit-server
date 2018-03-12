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

User.prototype.correctPassword = function (candidatePassword) {
    // should return true or false for if the entered password matches
    return User.encryptPassword(candidatePassword, this.salt) === this.password
};

User.prototype.sanitize = function () {
    return _.omit(this.toJSON(), ['password', 'salt']);
};

// class methods
User.generateSalt = function () {
    // this should generate our random salt
    return crypto.randomBytes(16).toString('base64')
};


User.encryptPassword = function (plainText, salt) {
    // accepts a plain text password and a salt, and returns its hash
    return crypto
        .createHash('RSA-SHA256')
        .update(plainText)
        .update(salt)
        .digest('hex');
};

function setSaltAndPassword(user) {
    // we need to salt and hash again when the user enters their password for the first time
    // and do it again whenever they change it
    if (user.changed('password') ){
        user.salt = User.generateSalt()
        user.password = User.encryptPasswor(user.password, user.salt)
    }
}

User.beforeCreate(setSaltAndPassword);
User.beforeUpdate(setSaltAndPassword);

module.exports = User