var express = require('express');
var router = express.Router();
const { ObjectID } = require('mongodb');

router.get('/', function (req, res) {
    console.log(req.body.fname + ' ' + req.body.lname)
    const para = { 'first': req.body.fname, 'last': req.body.lname }
    req.db.collection('students').find().toArray()
        .then(data => {
            console.log('get')
            res.json({ Status: "Success", data: data })
        })
        .catch(err => {
            console.log(err)
            res.json({ status: "Error" })
        })
})

router.get('/:id', function (req, res) {
    const id = req.params.id;
    //const para = { 'first': req.body.fname, 'last': req.body.lname }
    //req.db.collection('students').find({ Fname: { $eq: id } }).toArray()
    req.db.collection('students').findOne({ _id: { $eq: new ObjectID(id) } })
        .then(data => {
            console.log('get')
            res.json({ Status: "Success", data: data })
        })
        .catch(err => {
            console.log(err)
            res.json({ status: "Error" })
        })
})
router.post('/', function (req, res) {
    //const para = { 'first': req.body.fname, 'last': req.body.lname }
    req.db.collection('students').insertOne(req.body)
        .then(data => {
            res.json({ Status: "Success" })
        })
        .catch(err => {
            console.log(err)
            res.json({ status: "Error" })
        })
})

router.put('/:id', function (req, res) {
    console.log('req.body.Fname', req.body.Fname)
    req.db.collection('students').updateOne({ _id: { $eq: new ObjectID(id) } }, { $set: { "Fname": req.body } }, { multi: true })
        .then(data => {
            console.log('get')
            res.json({ Status: "Success" })
        })
        .catch(err => {
            console.log(err)
            res.json({ status: "Error" })
        })
})

router.delete('/:id', function (req, res) {
    const id = req.params.id;
    req.db.collection('students').removeOne({ _id: { $eq: new ObjectID(id) } })
        .then(data => {
            console.log('get')
            res.json({ Status: "Success" })
        })
        .catch(err => {
            console.log(err)
            res.json({ status: "Error" })
        })
})



module.exports = router