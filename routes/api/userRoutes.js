const router = require('express').Router();
const { User } = require('../../models');

// api/users

router.post('/signup', async (req, res) => {
  try {
    const email = req.body.email;
    const userData = await User.findOne({ where: {email: email }});

    if (userData) {
      // email already been used
      res.status(409).json({ message: 'email already been used, please change a new one.'});
      return;
    }

    User.create(req.body)
    .then(newUser=>res.json(newUser))
    .catch(err=>res.status(500).json(err));
    
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;