var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    console.log(req.body.fname + ' ' + req.body.lname)
    const para = { 'first': req.body.fname, 'last': req.body.lname }
    req.db.collection('books').find().toArray()
        .then(data => {
            console.log('get')
            res.json({ Status: "Success", data: data })
        })
        .catch(err => {
            console.log(err)
            res.json({ status: "Error" })
        })
})
router.get('/:keyword', function (req, res) {
    console.log('req.params.keyword', req.params.keyword)
    const para = req.params.keyword;
    // const para = { 'first': req.body.fname, 'last': req.body.lname }
    //req.db.collection('books').find({ title: { $eq: para } }).toArray()
    req.db.collection('books').find({ keyword: { $in: [para] } }).toArray()
        .then(data => {
            console.log('get')
            res.json({ Status: "Success", data: data })
        })
        .catch(err => {
            console.log(err)
            res.json({ status: "Error" })
        })
})


module.exports = router;