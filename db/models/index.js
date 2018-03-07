const User = require('./user')
const Item = require('./item')
const Wardrobe = require('./wardrobe')

Item.belongsTo(Wardrobe)
Wardrobe.hasMany(Item)

Wardrobe.belongsTo(User)

module.exports = {
    User,
    Wardrobe,
    Item
}

