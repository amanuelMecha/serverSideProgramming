const express = require('express');
const router = express.Router();

const jwtManager = require('../jwt/JwtManager')

//LOGIN 
router.post('/', function (req, res, next) {
    //console.log('req/url', req.url)
    const fname = req.body.fname;
    const email = req.body.email;
    //console.log(`  fname  ${fname}   email  ${email}     `)
    req.db.collection('students').findOne({ $and: [{ email: { $eq: email } }, { Fname: { $eq: fname } }] })
        .then(data => {
            console.log('get', data)
            // console.log("Email", data.email)
            // console.log("data.fname", data.Fname)
            if (data) {
                // if (fname === data.Fname && email === data.email) {
                console.log(`emaaaaaaaaaaaaaaaaaaaaaaaaa`, data._id)
                const datas = {};
                datas.id = data._id
                datas.email = data.email
                datas.Fname = data.Fname

                const token = jwtManager.generate(datas);
                res.json({ status: 'success', data: token });
                //  res.json({ Status: "logged in " })
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