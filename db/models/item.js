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
})

module.exports = Item