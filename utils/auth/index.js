const bearerToken = require('express-bearer-token');
const jwt = require('jsonwebtoken');
const { JWT_KEY } = require('../constants');

function authUser(req, res, next) {
    bearerToken()(req, res, () => {
        // Temporary Hack to extract the token from the request
        req.token = req.headers.authentication.split(' ')[1];
        jwt.verify(req.token, JWT_KEY, (err, decoded) => {
            if (err) {
                res.status(400).send({
                    error: 'Invalid JWT token',
                    cause: err,
                });
                return;
            }

            req.user = decoded;
            next();
        });
    });
}

module.exports = authUser;