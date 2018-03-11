const User = require('./user')
const Item = require('./item')
const Wardrobe = require('./wardrobe')
const Outfit = require('./outfit')

Item.belongsTo(Wardrobe)
Wardrobe.hasMany(Item)
Outfit.hasMany(Item)
Outfit.belongsTo(User)

Wardrobe.belongsTo(User)

module.exports = {
    User,
    Wardrobe,
    Item,
    Outfit
}

