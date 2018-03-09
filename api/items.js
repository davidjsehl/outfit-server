const router = require('express').Router()
const { Item } = require('../db/models')

router.post('/', (req, res, next) => {
    console.log('reqqqqqqueesttttt', req.body)
    Item.create({
        category: req.body.category,
        color: req.body.color.w3c.name,
        wardrobeId: 1,
    })
    .then(newItem => res.json(newItem))
    .catch(next)
})

module.exports = router