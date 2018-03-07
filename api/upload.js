const router = require('express').Router()
const { User } = require('../db/models')

const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')

const s3 = new aws.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: "us-east-1",
});

// Initialize multers3 with our s3 config and other options
const upload = multer({
    storage: multerS3({
        s3,
        bucket: process.env.AWS_BUCKET,
        acl: 'public-read',
        metadata(req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key(req, file, cb) {
            cb(null, Date.now().toString() + '.png');
        }
    })
})
console.log('uplloooooadddd', upload)


router.post('/', upload.single('photo'), (req, res, next) => {
    console.log('MADEEEE ITTTIO DDDDDDDDDD!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
    res.json(req.file)
})

// router.get('/', (req, res, next) => {
//     res.send('Yooooooo')
// })

module.exports = router