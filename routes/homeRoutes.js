const router = require('express').Router();
const withAuth = require('../utils/auth');
const SERVER = 'http://localhost:3001/'

// home path
router.get('/', async(req, res)=>{
    try {
        const response = await fetch(SERVER+'/api/blogs/')
        if (response.ok) {
            const blogs = response.json();
            console.log(blogs)
            res.render('homepage', {blogs});
        } else {
            console.log('no-blogs')
            res.render('homepage');
        }
    } catch (err) {
        console.error(err)
        res.status(500).json(err);
    }
});

module.exports = router;