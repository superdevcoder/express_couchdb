const jwt = require('jsonwebtoken');

const getDatabase = require('../utils/database/nano')
const { JWT_KEY } = require('../utils/constants');

async function login(req, res) {
    const user = req.body.user;
    const password = req.body.password;

    try {
        const blogdb = await getDatabase();
        const userDocKey = 'user::' + user;
        const result = await blogdb.get(userDocKey);

        if (result.value.password !== password) {
            res.status(401).send({
                error: 'Password does not match.',
            });
            return;
        }

        const token = jwt.sign(
            {
                user: user,
            },
            JWT_KEY
        );

        res.send({
            data: {
                token: token,
            },
        });
    } catch (err) {
        res.status(401).send({
            error: 'Invalid Username or Password',
        });
    }
}

async function signup(req, res) {
    const user = req.body.user;
    const password = req.body.password;

    try {
        const blogdb = await getDatabase();
        const userDocKey = 'user::' + user;
        const userDoc = {
            name: user,
            password: password,
        };

        await blogdb.insert(userDocKey, userDoc);

        const token = jwt.sign(
            {
                user: user,
            },
            JWT_KEY
        );

        res.send({
            data: {
                token: token,
            },
            context: ['created document ' + userDocKey],
        });
    } catch (err) {
        res.status(409).send({
            error: 'User already exists.',
        });
    }
}



module.exports = {
    login,
    signup
}