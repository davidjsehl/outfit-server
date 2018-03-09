const router = require('express').Router()
const { Item } = require('../db/models')

router.post('/', (req, res, next) => {
    console.log('reqqqqqqueesttttt', req.body)
    Item.create({
        category: req.body.category,
        color: req.body.color.w3c.name,
        imageUrl: req.body.imageUrl,
        wardrobeId: 1,
    })
    .then(newItem => res.json(newItem))
    .catch(next)
})

router.get('/:wardrobeId', (req, res, next) => {
    console.log('reqqwuuessstttt', req.body)
    Item.findAll({
        where:{
            wardrobeId: req.params.wardrobeId
        }
    })
    .then(items => res.json(items))
})

module.exports = router