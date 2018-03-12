const router = require('express').Router()
const User = require('../db/models')

router.post('/login', (req, res, next) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    })
    .then(user => {
        if (!user) {
            res.status(401).send('User not found')
        } else if (!user.correcPassword(req.body.password)) {
            res.status(401).send('Incorrect password')
        } else {
            req.login(user, err => err ? next(err) : res.json(user))
        }
    })
    .catch(next)
})

router.post('/signup', (req, res, next) => {
    User.create(req.body)
    .then(user => {
        req.login(user, err => (err ? next(err) : res.json(user)))
    })
    .catch( err => {
        if (err.name === 'SequelizeUniqueConstraintError') {
            res.status(401).send('User already exists')
        }
    })
})

router.post('/logout', (req, res, next) => {
    req.logout()
    res.sendStatus(204)
})

router.get('/me', (req, res) => {
    res.json(req.user)
})


module.exports = router