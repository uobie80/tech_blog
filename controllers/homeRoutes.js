const router = require('express').Router();
const { User, Blog } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all blogs and JOIN with user data
    const blogData = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    // Serialize data so the template can read it
    const blogs = blogData.map((blog) => blog.get({ plain: true }));
     console.log(blogs);
    // Pass serialized data and session flag into template
    res.render('home', { 
      blogs, 
      logged_in: req.session.logged_in,
      firstname: req.session.firstname,
      lastname: req.session.lastname
    });
  } catch (err) {
    res.status(500).json(err);
  }
});




router.get('/blog/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username','user_id'],
        },
      ],
    });

    const blog = blogData.get({ plain: true });

    res.render('add-comment', {
      ...blog,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/home');
    return;
  }

  res.render('login');
});

router.post('/login', async (req, res) => {
    try {
      const userData = await User.findOne({
        where: {
          username: req.body.username,
        },
      });
  
      if (!userData) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password. Please try again!' });
        return;
      }
      const validPassword = await userData.checkPassword(req.body.password);

      if (!validPassword) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password. Please try again!' });
        return;
      }

      console.log('You are now logged in!');
      
  
      req.session.save(() => {
        req.session.firstname = userData.firstname;
        req.session.lastname = userData.lastname;
        req.session.logged_in = true;
        res.status(200).json(userData);   
      });

     // res
    //  .status(200)
    //  .json({ user: dbUserData, message: 'You are now logged in!' });

    } catch (err) {
      console.log(err);
      res.status(500).json(err);
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


router.get('/', async (req, res) => {
res.send("In user routes");
});


router.get('/signup', (req, res) => {

  if (req.session.logged_in) {
    res.redirect('/home');
    return;
  }

  res.render('signup');
});


router.post('/signup', async (req, res) => {

   console.log(req.body);

  try {
    const userData = await User.create(req.body);

   req.session.save(() => {
     req.session.user_id = userData.id;
     req.session.firstname = userData.firstname;
     req.session.lastname = userData.lastname;
     req.session.logged_in = true;
     res.status(200).json(userData);   
   });
  
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

/*

router.get('/project/:id', async (req, res) => {
  try {
    const projectData = await Project.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const project = projectData.get({ plain: true });

    res.render('project', {
      ...project,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Project }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});
*/

module.exports = router;
