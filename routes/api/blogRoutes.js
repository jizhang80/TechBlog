const router = require('express').Router();
const { User, Blog, Comment } = require('../../models');

// api/blogs

router.get('/', async(req, res) => {
    // get all the blogs order by post date and time
    try {
        const blogsData = await Blog.findAll({
            include: [{model: User}],
            order: [
                ['updated_at', 'DESC'],
            ],
        });
        const blogs = blogsData.map((blog) => blog.get({ plain: true }));
        res.status(200).json(blogs);
    } catch (err) {
        res.status(500).json(err);
    };   
});


router.get('/user/:userId', async(req, res) => {
    // get all the blogs by userId
    try {
        const blogsData = await Blog.findAll({
            where: {
                user_id: req.params.userId,
            },
            include: [{model: User}],
        });
        const blogs = blogsData.map((blog) => blog.get({ plain: true }));
        res.status(200).json(blogs);
    } catch (err) {
        res.status(500).json(err);
    }; 
});


router.get('/blog/:blogId', async(req, res) => {
    // get the blog by blogID
    try {
        const blogData = await Blog.findByPk(req.params.blogId, {
            include: [{model: User}],
        });
        const blog = blogData.get({ plain: true });
        const commentsData = await Comment.findAll({
            where: {
                blog_id: req.params.blogId,
            },
            include: [{model: User}],
            order: [
                ['updated_at', 'DESC'],
            ],
        });
        const comments = commentsData.map(comment=>comment.get({ plain: true }));
        const blogObj = {blog, comments};
        res.status(200).json(blogObj);
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    };
})


router.post('/', (req, res) => {
    // post a new blog
    Blog.create({
        title: req.body.title,
        content: req.body.content,
        user_id: req.session.user_id,
    })
    .then(newBlog=>{
        res.json(newBlog);
    })
    .catch(err=>{
        res.status(500).json(err);
    });
});


router.post('/blog/:blogId/comment', (req, res) => {
    // post a new comment
    Comment.create({
        content: req.body.content,
        blog_id: req.params.blogId,
        user_id: req.session.user_id,
    })
    .then(newComment=>{
        res.json(newComment);
    })
    .catch(err=>{
        console.error(err)
        res.status(500).json(err);
    });
});


router.put('/blog/:blogId', (req, res) => {
    // update a blog
    Blog.update({
        title: req.body.title,
        content: req.body.content,
    },
    {
        where: {
            id: req.params.blogId,
        },
    }) 
    .then((updatedBlog) => {
        res.json(updatedBlog);
    })
    .catch((err) => {
        console.log(err);
        res.json(err);
    });
});


router.delete('/:blogId', (req, res) => {
    // delete a blog
    Blog.destroy({
        where: {
            id: req.params.blogId,
        },
    })
    .then((deletedBlog) => {
        res.json(deletedBlog);
    })
    .catch((err) => res.json(err));
});


module.exports = router;