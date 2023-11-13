const router = require('express').Router();
const withAuth = require('../utils/auth');
const SERVER = 'http://localhost:3001'

// home path
router.get('/', (req, res)=>{
    fetch(SERVER+'/api/blogs/')
        .then(response=>response.json())
        .then(blogs=>{
            res.render('homepage', {blogs});
        })
        .catch(error => {
            res.render('homepage', {error})
            console.error('Error', error);
        });
});

router.get('/blog/:blogId', (req, res) => {
    const blogId = req.params.blogId;
    fetch(SERVER + `/api/blogs/blog/${blogId}`)
        .then(response=>response.json())
        .then(blog=>{
            res.render('blog', {blog});
        })
        .catch(error => {
            res.render('blog', {error})
            console.error('Error', error);
        });
})

module.exports = router;