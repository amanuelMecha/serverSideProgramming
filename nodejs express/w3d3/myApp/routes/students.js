//const { ObjectID } = require('bson');
var express = require('express');
var router = express.Router();
const { ObjectID } = require('mongodb')

router.get('/', (req, res) => {
    req.db.collection('students').find().toArray()
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.json(err)
        })
})

router.get('/:id', (req, res) => {
    console.log('amama', req.params.id)
    req.db.collection('students').findOne({ '_id': new ObjectID(req.params.id) })
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.json(err)
        })
})
function checkValidity(req, res, next) {
    console.log('amama', )
    console.log('best', req.body.grade)
    if (req.body.id === "" || req.body.name === "" || req.body.course === "" || req.body.grade === "") {
        res.json({ Status: "invalid body" })
    } else {
        next()
    }
}

router.post('/', checkValidity, (req, res) => {
    req.db.collection('students').insertOne(req.body)
        .then(data => {
            res.json({ status: "Added successfully" })
        })
        .catch(err => {
            res.json(err)
        })

})


router.delete('/:id', (req, res) => {
    console.log('amama', req.params.id)
    req.db.collection('students').removeOne({ '_id': new ObjectID(req.params.id) })
        .then(data => {
            res.json({ status: "Deleted successfuly " })
        })
        .catch(err => {
            res.json(err)
        })
})


module.exports = router