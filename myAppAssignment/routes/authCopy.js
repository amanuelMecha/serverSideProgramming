const express = require('express');
const router = express.Router();

const jwtManager = require('../jwt/JwtManager')

//LOGIN 
router.post('/', function (req, res, next) {
    const fname = req.body.fname;
    const email = req.body.email;
    console.log(`  fname  ${fname}   email  ${email}     `)
    // $or: [ { quantity: { $lt: 20 } }, { price: 10 } ] }
    req.db.collection('students').findOne({ $and: [{ email: { $eq: email } }, { Fname: { $eq: fname } }] })
        .then(data => {
            console.log('get', data)
            // console.log("Email", data.email)
            // console.log("data.fname", data.Fname)

            if (data) {

                //if (fname === data.Fname && email === data.email) {
                console.log(`emaaaaaaaaaaaaaaaaaaaaaaaaa`)
                // const data = {};
                // data.id = 1;
                // data.email = 'uinan@miu.edu';
                // data.comment = 'JWT is awesome'
                // const token = jwtManager.generate(data);
                //  res.json({ data: token, status: 'success' });
                res.json({ Status: "logged in " })
            }
            else {
                res.json({ status: 'invalid_user' });
            }
        })
        .catch(err => {
            console.log(err)
            res.json({ status: "Error" })
        })




});



module.exports = router;