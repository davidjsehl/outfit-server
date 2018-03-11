const Sequelize = require ('sequelize')
const db = require('../db')

const Outfit = db.define('outfit', ({
    name: {
        type: Sequelize.STRING
    },   
}))

module.exports = Outfit