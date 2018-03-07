const Sequelize = require('sequelize')
const db = require('../db')

const Wardrobe = db.define('wardrobe', {
    name: {
        type: Sequelize.STRING
    }
})

module.exports = Wardrobe