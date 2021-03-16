const express = require('express');
const router = express.Router();

const jwtManager = require('../jwt/JwtManager')

//LOGIN 
router.post('/:id', function (req, res, next) {
    const path = req.params.id;

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

    req.db.collection(collectionName).findOne({ email: email, Fname: fname })
        .then(data => {
            if (data) {
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