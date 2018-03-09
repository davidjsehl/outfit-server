const router = require('express').Router()
const { Wardrobe } = require('../db/models')

router.get('/:userId', (req, res, next) => {
    // console.log('reqqqqqqueesttttt BODDYYYY!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', req)
    Wardrobe.findOne({
        where: {
            userId: req.params.userId
        }
    })
    .then(wardrobe => res.json(wardrobe))
    .catch(next)

})

module.exports = router