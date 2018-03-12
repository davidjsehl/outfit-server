const express = require('express')
const morgan = require('morgan')
const path = require('path')
const bodyParser = require('body-parser')
const passport = require('passport')
const session = require('express-session')
const compression = require('compression')

const db = require('./db')


const app = express()

module.exports = app


const PORT = process.env.PORT || 1313

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

passport.serializeUser((user, done) => done(null, user.id))
passport.deserializeUser((id, done) =>
    db.models.user.findById(id)
        .then(user => done(null, user))
        .catch(done))

const createApp = () => {

    app.use(morgan('dev'))
    
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))
    
    app.use(compression());
    
    app.use(session({
        secret: process.env.SESSION_SECRET || 'nyctillthedeathofme',
        resave: true,
        saveUninitialized: true,
    }));
    
    app.use(passport.initialize());
    app.use(passport.session());

    app.use('/auth', require('./auth'))
    app.use('/api', require('./api'))
    
    app.use(express.static(path.join(__dirname, 'public')))

    app.use((req, res, next) => {
        if (path.extname(req.path).length) {
            const err = new Error('Not found');
            err.status = 404;
            next(err);
        } else {
            next();
        }
    });

    app.use('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'public', 'index.html'));
    });

    app.use((err, req, res, next) => {
        console.error(err);
        console.error(err.stack);
        res.status(err.status || 500).send(err.message || 'Internal server error.');
    });
}

const startListening = () => {
    const server = app.listen(PORT, () => {
        console.log('Listening on port ', PORT);
    })
}

const syncDb = () => db.sync()

if (require.main === module) {
    syncDb()
        .then(createApp)
        .then(startListening);
} else {
    createApp();
}