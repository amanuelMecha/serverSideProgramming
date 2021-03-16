var express = require('express');
var router = express.Router();


router.get('/', function (req, res) {
    console.log(req.body.fname + ' ' + req.body.lname)
    const para = { 'first': req.body.fname, 'last': req.body.lname }
    req.db.collection('Author').find().toArray()
        .then(data => {
            console.log('get')
            res.json({ Status: "Success", data: data })
        })
        .catch(err => {
            console.log(err)
            res.json({ status: "Error" })
        })
})


module.exports = router