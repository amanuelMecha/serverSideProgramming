const jwtManager = require('../jwt/JwtManager');

class Authorization {
    authenticate(req, res, next) {

        if (req.url === '/api/v1/authentication/student' || req.url === '/api/v1/authentication/library' || req.url === 'api/v1/signUp') {
            next();
            return;
        }
        const header = req.headers.authorization;
        console.log('header', header)
        if (!header) {
            return res.json({ status: 'auth_error' });
        } else {
            const data = jwtManager.verify(header);
            if (!data) {
                return res.json({ status: 'auth_error' });
            }

            //authorization
            if (req.url === '/api/v1/students') {
                //console.log(`dkfkasfkajkfajkfja`, req.url)
                if (data.role == 'student') {
                    return next();
                } else {
                    return res.json({ status: 'auth_error' });
                }
            } else if (req.url === '/api/v1/library' || req.url === '/api/v1/library/borrowed') {
                if (data.role == 'librarian') {
                    return next();
                } else {
                    return res.json({ status: 'auth_error' });
                }
            }


            next();
        }
    }
}

module.exports = new Authorization();