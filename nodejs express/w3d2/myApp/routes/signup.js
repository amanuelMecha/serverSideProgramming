const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

router.post('/', function (req, res) {
    let docs = req.body;
    const role = req.body.role;
    let collectionName;
    if (role === 'student') {
        collectionName = 'students';
    } else if (role === 'librarian') {
        collectionName = 'library';
    } else {
        res.json({ status: "Sorry you can't sign up to the system" })
    }
    req.db.collection(collectionName).findOne({ email: docs.email })
        .then(datas => {
            console.log('data', datas)
            if (!datas) {
                let hashedPass = bcrypt.hashSync('docs.password', 12);
                docs.password = hashedPass;
                req.db.collection(collectionName).insertOne(docs)
                    .then(data => {
                        console.log({ status: "inserted successfully" });
                        res.json({ status: "You are added to the system!" })
                    })
                    .catch(err => { console.log(err) })

            } else {
                res.json({ Status: "user already exist" })
            }
        })
        .catch(err => {
            res.json({ Status: "errrr" })
        })
    //const hashedPass = bcrypt.hashSync(password, 12);
})



module.exports = router