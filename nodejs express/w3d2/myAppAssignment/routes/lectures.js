var express = require('express');
var router = express.Router();

const { ObjectID } = require('mongodb');

// get post put delete

// repository CRUD

// safe idempotent

//http://localhost:3000/lectures/ GET
router.get('/', (req, res) => {
    req.db.collection('lectures').find().toArray((err, data) => {
        res.json({ result: 'success', data: data });
    })
});

//one
//http://localhost:3000/lectures/id GET
router.get('/:id', (req, res) => {
    req.db.collection('lectures').findOne({ '_id': new ObjectID(req.params.id) }).then(data => {
        res.json({ result: 'success', data: data });
    }).catch(err => {
        res.json({ result: 'fail' });
    });
});

//http://localhost:3000/lectures/ POST
router.post('/', function (req, res) {
    req.db.collection('lectures').insertOne(req.body)
        .then(data => {
            res.json({ result: 'success' });
        })
        .catch(err => {
            res.json({ result: 'fail' });
        });
});

//http://localhost:3000/lectures/id DELETE
router.delete('/:id', function (req, res) {
    req.db.collection('lectures').removeOne({ '_id': new ObjectID(req.params.id) })
        .then(data => {
            res.json({ result: 'success' });
        })
        .catch(err => {
            res.json({ result: 'fail' });
        });
});

//http://localhost:3000/lectures/id PUT 
router.put('/:id', (req, res) => {
    req.db.collection('lectures').updateOne({ '_id': new ObjectID(req.params.id) },
        { '$set': req.body })
        .then(result => {
            res.json({ result: 'success' });
        })
        .catch(err => {
            res.json({ result: 'fail' });
        })
});


module.exports = router;