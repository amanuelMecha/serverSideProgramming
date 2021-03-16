const express = require('express');
const router = express.Router();

const jwtManager = require('../jwt/JwtManager')


//LOGIN 
router.post('/', function (req, res, next) {
    const email = req.body.email;
    const password = req.body.password;

    if (email === 'uinan@miu.edu' && password === '123') {
        const data = {};
        data.id = 1;
        data.email = 'uinan@miu.edu';
        data.comment ='JWT is awesome'
        const token = jwtManager.generate(data);
        res.json({ data: token, status: 'success' });
    } 
    else {
        res.json({ status: 'invalid_user' });
    }
});



module.exports = router;