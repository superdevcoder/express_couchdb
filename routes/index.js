const { Router } = require('express');

const blog = require('./blog');
const auth = require('./auth');

const router = Router();

router.use('/blog', blog);
router.use('/user', auth);

module.exports = router;