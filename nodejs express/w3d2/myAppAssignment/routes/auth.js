const express = require('express');
const router = express.Router();

const jwtManager = require('../jwt/JwtManager')

//LOGIN 
router.post('/:id', function (req, res, next) {
    const path = req.params.id;
    console.log('req/url', path)
    const fname = req.body.fname;
    const email = req.body.email;
    let collectionName;
    if (path === 'student') {
        collectionName = 'students';
        console.log('collectionName', collectionName)
    } else if (path === 'library') {
        collectionName = 'library';
    } else {
        res.json({ Status: 'No matching collection found' })
    }
    //console.log(`  fname  ${fname}   email  ${email}     `)
    // req.db.collection(collectionName).findOne({ $and: [{ email: { $eq: email } }, { Fname: { $eq: fname } }] })
    req.db.collection(collectionName).findOne({ email: email, Fname: fname })
        .then(data => {
            console.log('get', data)
            // console.log("Email", data.email)
            // console.log("data.fname", data.Fname)
            if (data) {
                // if (fname === data.Fname && email === data.email) {
                // console.log(`emaaaaaaaaaaaaaaaaaaaaaaaaa`, data._id)
                const datas = {};
                datas.id = data._id
                datas.email = data.email
                datas.Fname = data.Fname
                datas.role = data.role

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