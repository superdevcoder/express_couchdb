const getDatabase = require('../utils/database/nano')

async function getBlogs(req, res, next) {
    // const username = req.params.username;
    //
    // if (username !== req.user.user) {
    //     res.status(401).send({
    //         error: 'Username does not match token username.',
    //     });
    //     return;
    // }

    try {
        const blogdb = getDatabase();
        const blogs = await blogdb.view("blog", "blog-data");

        if (blogs.length === 0) {
            return handleError(res, 400, 'Blogs do not exist.');
        }

        res.json(blogs);
    } catch (err) {
        next(err);
    }
}

async function getBlog(req, res, next) {
    // const username = req.params.username;
    //
    // if (username !== req.user.user) {
    //     res.status(401).send({
    //         error: 'Username does not match token username.',
    //     });
    //     return;
    // }

    try {
        const blogdb = getDatabase();
        const { id } = req.params;

        const blog = await blogdb.get(id, {revs_info: true});

        if (!blog) {
            return handleError(res, 400, 'The Blog does not exist.');
        }

        res.json(blog);
    } catch (err) {
        next(err);
    }
}

async function createBlog(req, res, next) {
    // const username = req.params.username;
    //
    // if (username !== req.user.user) {
    //     res.status(401).send({
    //         error: 'Username does not match token username.',
    //     });
    //     return;
    // }

    try {
        const blogdb = getDatabase();
        const day = new Date();
        const formattedDate = day.toString();
        const urlTitle = req.body.title.replace(/\s+/g, '-').toLowerCase();

        const blog = blogdb.insert({
            title: req.body.title,
            body: req.body.body,
            date: formattedDate
        }, urlTitle);

        if (!blog) {
            return handleError(res, 400, 'The Blog is not created.');
        }

        res.status(201).json(blog);
    } catch (err) {
        next(err);
    }
}

async function updateBlog (req, res, next) {
    // const username = req.params.username;
    //
    // if (username !== req.user.user) {
    //     res.status(401).send({
    //         error: 'Username does not match token username.',
    //     });
    //     return;
    // }

    try {
        const blogdb = getDatabase();
        const { id } = req.params;

        console.log("pooh update id = ", id);

        const blog = await blogdb.get(id, {revs_info: true});

        const updatedBlog = await blogdb.insert({
            title: req.body.title,
            body: req.body.body,
            date: req.body.date,
            _rev: blog._rev
        }, id)

        if (!updatedBlog) {
            return handleError(res, 400, 'The Blog is not updated.');
        }

        res.json(updatedBlog);
    } catch (err) {
        next(err);
    }
}

async function deleteBlog (req, res, next) {
    // const username = req.params.username;
    //
    // if (username !== req.user.user) {
    //     res.status(401).send({
    //         error: 'Username does not match token username.',
    //     });
    //     return;
    // }

    try {
        const blogdb = getDatabase();
        const { id } = req.params;

        const blog = await blogdb.get(id, {revs_info: true});

        await blogdb.destroy(blog._id, blog._revs_info[0].rev);

        res.json({ deleted: true });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getBlogs,
    getBlog,
    createBlog,
    updateBlog,
    deleteBlog
}