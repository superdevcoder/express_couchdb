const { Router } = require('express');
const { login, signup } = require('../controllers/auth');

const router = Router();

router.post('/login', login);
router.get('/signup', signup);

module.exports = router;
