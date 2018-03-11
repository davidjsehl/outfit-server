const Sequelize = require('sequelize')
const db = require('../db')

const Item = db.define('item', {
    name: {
        type: Sequelize.STRING
    },
    category: {
        type: Sequelize.STRING
    },
    color: {
        type: Sequelize.STRING
    },
    imageUrl: {
        type: Sequelize.STRING,
    },
    isDirty: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
})

module.exports = Item