const router = require('express').Router()
const { User } = require('../db/models')

router.get('/', (req, res, next) => {
    User.findAll()
    .then(users => res.json(users))
    .catch(next)
})

module.exports = router