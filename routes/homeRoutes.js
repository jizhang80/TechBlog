const router = require('express').Router();
const withAuth = require('../utils/auth');
const SERVER = `http://localhost:${process.env.PORT||3001}`

// home path
router.get('/', (req, res)=>{
    fetch(SERVER+'/api/blogs/')
        .then(response=>response.json())
        .then(blogs=>{
            res.render('homepage', {
                blogs,
                logged_in: req.session.logged_in,   // session login data
            });
        })
        .catch(error => {
            console.error('Error', error);
        });
});

router.get('/blog/:blogId', withAuth, (req, res) => {
    const blogId = req.params.blogId;
    fetch(SERVER + `/api/blogs/blog/${blogId}`)
        .then(response=>response.json())
        .then(blogObj=>{
            res.render('blog', {
                blog: blogObj.blog,
                comments: blogObj.comments,
                logged_in: req.session.logged_in,   // session login data
            });
        })
        .catch(error => {
            console.error('Error', error);
        });
});

router.get('/dashboard', withAuth, (req, res) => {
    const userId = req.session.user_id;
    fetch(SERVER + `/api/blogs/user/${userId}`)
    .then(response=>response.json())
        .then(blogs=>{
            res.render('myBlogs', {
                blogs,
                logged_in: req.session.logged_in,   // session login data
            });
        })
        .catch(error => {
            console.error('Error', error);
        });
});

// Login route
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
    res.render('login');
  });

// signup route
router.get('/signup', (req, res) => {
    res.render('signup');
  });

// new blog route
router.get('/newPost', withAuth, (req, res) => {
    res.render('newBlog', {
        logged_in: req.session.logged_in,   // session login data
    });
  });

module.exports = router;