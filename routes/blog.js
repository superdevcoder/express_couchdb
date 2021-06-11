const { Router } = require('express');
const { createBlog, deleteBlog, updateBlog, getBlogs, getBlog } = require('../controllers/blog');

const authUser = require('../utils/auth');

const router = Router();

router.get('/', getBlogs);
router.get('/:id', getBlog);
router.post('/', createBlog);
router.put('/:id', updateBlog);
router.delete('/:id', deleteBlog);

module.exports = router;
