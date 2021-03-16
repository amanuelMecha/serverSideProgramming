const jwtManager = require('../jwt/JwtManager');

class Authorization {
    authenticate(req, res, next) {

        if (req.url === '/auth') {
            next();
            return;
        }
        const header = req.headers.authorization;
        if (!header) {
            return res.json({ status: 'auth_error' });
        } else {
            const data = jwtManager.verify(header);
            if (!data) {
                return res.json({ status: 'auth_error' });
            }

            // if(req.url==='/api/users'){
            //    if(data.role=='admin'){
            //         next();
            //    }else{
            //     return res.json({ status: 'auth_error' });
            //    }
            // }

            next();
        }
    }
}

module.exports = new Authorization();